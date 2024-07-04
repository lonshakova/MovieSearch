import { defineStore } from 'pinia'

export const useMoviesStore = defineStore({
  id: 'movies',
  state: () => ({
    // movies: [],
    allMovies:[],
    allMarks: [],
    ratesMovies: [],
    selectedSort: { value: "name", name: "По названию" },
    searchQuery: null,
    limit: 24,
    page: 0,
  }),
  getters: {
    sortedMovies(state) {
      switch (state.selectedSort.value) {
        case 'name':
          return state.allMovies.sort((movie1, movie2) => movie1.name?.localeCompare(movie2.name));
        case 'year':
          return state.allMovies.sort((movie1, movie2) => movie1.year - movie2.year);
        case 'movieLength':
          return state.allMovies.sort((movie1, movie2) => movie1.movieLength - movie2.movieLength);
        case 'rating':
          return state.allMovies.sort((movie1, movie2) => localStorage.getItem(movie2.id) - localStorage.getItem(movie1.id));
        default:
          return state.allMovies;
      }
    },
    searchMovies(state) {
      if (!this.sortedMovies) {return  this.allMovies.slice(this.limit * this.page, this.limit * (this.page + 1))}
      if (state.searchQuery === null) {
        return this.allMovies.slice(this.limit * this.page, this.limit * (this.page + 1));
      }
      return this.allMovies.filter(movie => movie.name.toLowerCase().includes(state.searchQuery.toLowerCase())).slice(this.limit * this.page, this.limit * (this.page + 1));
    },

  },
  actions: {
    fetchMovies() {
      return fetch('../../Data/kinopoisk-1.json')
        .then(response => response.json())
        .then((data) => {
          this.allMovies = data.docs;
          return data.docs;
        })
        .catch(error => {
          console.error('Ошибка загрузки данных', error);
        });
    },

    fetchMoviesMarks() {
      this.fetchMovies().then(()=>{
        this.loadMarks();
        this.allMovies = this.allMarks;
      });
    },

    fetchMoviesRates() {
      this.fetchMovies().then(()=>{
        this.loadRates();
        this.allMovies = this.ratesMovies;
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

    // updateMovies(limit, page) {
    //   this.movies=this.allMovies.slice(limit * page, limit * (page + 1));
    // },

    recomendMovies(thisMovieId) {
      let list = [];
      let count = 3;
      while (list.length < count) {
        const ind = Math.round(Math.random()*this.allMovies.length);
        const film = this.allMovies[ind];
        if (film) {
          const dubl = list.find((movie) => film.id === movie.id || thisMovieId.id === movie.id);
          if (dubl) {
            continue
          }
          else {
            list.push(film);
          }
        }
      }
      return list;
    },
  }
})