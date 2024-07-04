<template>
  <v-hover v-slot="{ isHovering, props }">
    <v-card
      class="card-movie"
      :class="{ 'on-hover': isHovering }"
      :elevation="isHovering ? 20 : 2"
      v-bind="props"
      @click="goToMovie()"
    >
      <v-img
        cover
        :src="movie.poster.url"
        class="align-end"
        gradient="to bottom, rgba(0,0,0,0),rgba(0,0,0,0.4), rgba(0,0,0,.9)"
        height="500"
      >
        <div class="info">
          <div class="title-and-description">
            <div class="title">
              {{ movie.name }}
            </div>
            <div class="year" v-if="isHovering">
              {{ movie.year }} | <span>{{ timing }} </span>
            </div>
            <div class="description" v-if="isHovering">
              {{ movie.shortDescription }}
            </div>
          </div>
          <div>
            <div class="icons">
              <v-btn
                class="icon"
                v-if="isHovering"
                @click.stop="localMarkMovie()"
                icon="mdi-bookmark"
              >
                <v-icon :color="this.isMarked ? '#21C2F8' : '#F3F7F8'" />
              </v-btn>
              <div
                class="icon"
                v-if="userRate && userRate !== 0"
                @click.stop="rateMovie(userRate, movie.id)"
              >
                {{ userRate }}
              </div>
              <v-btn
                class="icon"
                v-else
                icon="mdi-star"
                @click.stop="isRatingChange = !isRatingChange"
              />
            </div>
            <div class="slider" v-if="isRatingChange">
              <v-slider
                v-model="userRate"
                show-ticks="always"
                step="0.5"
                max="10"
                min="0"
                @click.stop="rateMovie(userRate, movie.id)"
              />
            </div>
          </div>
        </div>
      </v-img>
    </v-card>
  </v-hover>
</template>

<script>
  import { useMoviesStore } from "../store/movieStore";
  export default {
    setup() {
      const moviesStore = useMoviesStore();
      return {
        moviesStore,
      };
    },
    data() {
      return {
        isRatingChange: false,
        isMarked: false,
        userRate: 0,
      };
    },
    props: {
      movie: {
        type: Object,
        required: true,
      },
    },
    computed: {
      timing() {
        let time = "";
        const hours = Math.floor(this.movie.movieLength / 60);
        const minuts = this.movie.movieLength % 60;
        if (hours !== 0) {
          time = hours + " ч ";
        }
        if (minuts !== 0) {
          time = time + minuts + " мин";
        }
        return time;
      },
    },
    methods: {
      goToMovie() {
        this.$router.push(`/movie/${this.movie.id}`);
      },
      localMarkMovie() {
        this.moviesStore.allMarks =
          JSON.parse(localStorage.getItem("marks")) || [];
        this.isMarked = !this.moviesStore.allMarks.some(
          (mark) => mark == this.movie.id
        );
        this.moviesStore.markMovie(this.movie.id);
        if (
          this.$router.options.history.state.current == "/marks" &&
          this.isMarked == false
        ) {
          this.moviesStore.allMovies = this.moviesStore.allMovies.filter(
            (film) => film.id != this.movie.id
          );
        }
      },
      rateMovie(userRate, id) {
        this.isRatingChange = !this.isRatingChange;
        this.moviesStore.rateMovie(userRate, id);
        if (
          this.$router.options.history.state.current == "/ratings" &&
          userRate == 0
        ) {
          this.moviesStore.allMovies = this.moviesStore.allMovies.filter(
            (film) => film.id != this.movie.id
          );
        }
      },
    },
    created() {
      this.moviesStore.allMarks =
        JSON.parse(localStorage.getItem("marks")) || [];
      this.isMarked = this.moviesStore.allMarks.some(
        (mark) => mark == this.movie.id
      );
      this.userRate = +localStorage.getItem(this.movie.id);
    },
  };
</script>

<style scoped>
  .card-movie {
    margin-top: 45px;
    max-width: 350px;
    max-height: 500px;
    border-radius: 25px;
    background-color: #2c3e50;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
      Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
      sans-serif;
  }

  .v-card:not(.on-hover) {
    opacity: 0.8;
  }

  .info {
    width: 350px;
    height: 500px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-direction: column-reverse;
    text-align: center;
  }

  .title-and-description {
    color: #f3f7f8;
    text-transform: uppercase;
  }

  .title {
    font-size: 30px;
    font-weight: 100;
  }

  .year {
    text-align: center;
    font-size: 15px;
    font-weight: 100;
    font-style: italic;
  }

  .description {
    margin: 10px;
    text-align: left;
    font-size: 17px;
    font-weight: 100;
  }

  .icons {
    margin-top: 12px;
    width: 350px;
    display: flex;
    justify-content: end;
  }

  .icon {
    height: 50px;
    width: 50px;
    margin-right: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    border-radius: 30px;
    background-color: rgba(44, 62, 80, 0.5);
    color: #f3f7f8;
  }

  .slider {
    margin: 10px 0px;
    padding: 0px 5px;
    width: 340px;
    height: 35px;
    border-radius: 30px;
    background-color: rgba(243, 247, 248, 0.8);
  }
</style>
