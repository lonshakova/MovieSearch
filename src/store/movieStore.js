import { defineStore } from 'pinia'

export const useMoviesStore = defineStore({
  id: 'movies',
  state: () => ({
    movies: [],
    allMovies:[],
    allMarks: [],
    ratesMovies: [],
    limit: 24,
    page: 0,
    totalPages: 0,
  }),
  actions: {
    async fetchMovies() {
      fetch('../../Data/kinopoisk-1.json')
        .then(response => response.json())
        .then(data => {
          window.scrollTo(0, 0);
          this.page = 0;
          this.allMovies = data.docs;
          this.movies = this.allMovies.slice(this.limit * this.page, this.limit * (this.page + 1));
          this.totalPages = Math.ceil(this.allMovies.length/this.limit);
        })
        .catch(error => {
          console.error('Ошибка загрузки данных', error);
        });
    },

    async fetchMoviesMarks() {
      fetch('../../Data/kinopoisk-1.json')
        .then(response => response.json())
        .then(data => {
          window.scrollTo(0, 0);
          this.page = 0;
          this.allMovies = data.docs;
          this.loadMarks();
          this.allMovies = this.allMarks;
          this.totalPages = Math.ceil(this.allMovies.length/this.limit);
        })
        .catch(error => {
          console.error('Ошибка загрузки данных', error);
        });
    },

    async fetchMoviesRates() {
      fetch('../../Data/kinopoisk-1.json')
        .then(response => response.json())
        .then(data => {
          window.scrollTo(0, 0);
          this.page = 0;
          this.allMovies = data.docs;
          this.loadRates();
          this.allMovies = this.ratesMovies;
          this.totalPages = Math.ceil(this.allMovies.length/this.limit);
        })
        .catch(error => {
          console.error('Ошибка загрузки данных', error);
        });
    },

    async fetchMovie() {
      fetch('../../Data/kinopoisk-1.json')
        .then(response => response.json())
        .then(data => {
          window.scrollTo(0, 0);
          this.page = 0;
          this.allMovies = data.docs;
          this.loadRates();
          this.allMovies = this.ratesMovies;
          this.totalPages = Math.ceil(this.allMovies.length/this.limit);
        })
        .catch(error => {
          console.error('Ошибка загрузки данных', error);
        });
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

    loadMovie() {
      const movie = this.allMovies.find(movie => movie.id == this.$route.params.id);
    },

    updateList(newList) {
      switch (newList) {
        case 'main':
          this.fetchMovies();
          this.movies=this.allMovies.slice(this.limit * this.page, this.limit * (this.page + 1));
          break;
        case 'marks':
          this.fetchMoviesMarks();
          this.movies = this.allMarks.slice(this.limit * this.page, this.limit * (this.page + 1));
          break;
        case 'ratings':
          this.fetchMoviesRates();
          this.movies = this.ratesMovies.slice(this.limit * this.page, this.limit * (this.page + 1));
          break;
        case 'movie':
          this.fetchMovies(); 
          this.loadMovie();
        default:
          this.fetchMovies();
          break;
      }
    },

    updatePage(number) {
      this.page = number;
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

    recomendMovies(movie) {
      let list = [];
      let count = 3;
      while (list.length < count) {
        const ind = Math.round(Math.random()*this.allMovies.length);
        const film = this.allMovies[ind];
        if (film) {
          const dubl = list.find((move) => film.id === move.id);
          if (dubl) {
            continue
          } else {
            if (movie.type === 'animated-series' || movie.type === 'cartoon') {
              if (film.type === 'animated-series' || film.type === 'cartoon') {
                list.push(film);
                continue
              }
            }
            if (film.type !== movie.type || film.id === movie.id) { continue };
            list.push(film);
          }
        }
      }
      return list
    },
  }
})