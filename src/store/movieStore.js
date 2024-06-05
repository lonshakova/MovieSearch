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

    recomendMovies(thisMovieId) {
      let list = [];
      let count = 3;
      this.constMovies = this.constMovies.filter((movie) => movie.id != thisMovieId);
      while (list.length < count) {
        if (this.constMovies.length == 0){
          return list;
        }
        const ind = Math.round(Math.random()*this.constMovies.length);
        const film = this.constMovies[ind];
        if (film) {
          list.push(film);
          this.constMovies = this.constMovies.filter((movie) => movie.id != film.id);
        }
      }
      return list;
    },
  }
})