import { defineStore } from 'pinia'

export const useMoviesStore = defineStore({
  id: 'movies',
  state: () => ({
    movies: [],
    constMovies: [],
    allMovies:[],
    allMarks: [],
    ratesMovies: [],
  }),
  actions: {
    async fetchMovies() {
      return await fetch('../../Data/kinopoisk-1.json')
        .then(response => response.json())
        .then((data) => {
          this.allMovies = data.docs;
          this.constMovies = this.allMovies;
          return data.docs;
        })
        .catch(error => {
          console.error('Ошибка загрузки данных', error);
        });
    },

    async fetchMoviesMarks() {
      await this.fetchMovies();
      this.loadMarks();
      this.allMovies = this.allMarks;
      this.constMovies = this.allMovies;
    },

    async fetchMoviesRates() {
      await this.fetchMovies();
      this.loadRates();
      this.allMovies = this.ratesMovies;
      this.constMovies = this.allMovies;
    },

    loadMarks() {
      this.allMarks = [];
      let marksId = JSON.parse(localStorage.getItem('marks')) || [];
      for (let mark of marksId) {
        const movie = this.allMovies.find((movie) => movie.id == mark);
        if (movie) {this.allMarks.push(movie);}
      }
    },

    loadRates() {
      this.ratesMovies = [];
      for(let i=0; i<localStorage.length; i++) {
        let key = localStorage.key(i);
        if (key == 'marks') {continue};
        const movie = this.allMovies.find((movie) => movie.id == key);
        this.ratesMovies.push(movie);
      }
    },

    updateList(newList) {
      switch (newList) {
        case 'main':
          this.fetchMovies();
          break;
        case 'marks':
          this.fetchMoviesMarks();
          break;
        case 'ratings':
          this.fetchMoviesRates();
          break;
        default:
          this.fetchMovies();
          break;
      }
    },

    markMovie(id) {
      let marks = JSON.parse(localStorage.getItem('marks')) || [];
      if (marks.length) {
        let movie = marks.find((movie) => movie == id);
        if (movie) {
          marks = marks.filter((movie) => movie !== id);
        } else {
          marks.push(id);
        }
      }
      else {
        marks.push(id);
      }
      localStorage.setItem('marks', JSON.stringify(marks));
    },

    rateMovie(userRating, id) {
      if (userRating) {
        localStorage.setItem(id, JSON.stringify(userRating))
      }
      else {
        window.localStorage.removeItem(id);
      }
    },

    recomendMovies() {
      let list = [];
      let count = 3;
      while (list.length < count) {
        const ind = Math.round(Math.random()*this.constMovies.length);
        const film = this.allMovies[ind];
        if (film) {
          list.push(film);
        }
      }
      // while (list.length < count) {
      //   const ind = Math.round(Math.random()*this.allMovies.length);
      //   const film = this.allMovies[ind];
      //   if (film) {
      //     const dubl = list.find((move) => film.id === move.id);
      //     if (dubl) {
      //       continue
      //     } else {
      //       if (movie.type === 'animated-series' || movie.type === 'cartoon') {
      //         if (film.type === 'animated-series' || film.type === 'cartoon') {
      //           list.push(film);
      //           continue
      //         }
      //       }
      //       if (film.type !== movie.type || film.id === movie.id) { continue };
      //       list.push(film);
      //     }
      //   }
      // }
      return list
    },
  }
})