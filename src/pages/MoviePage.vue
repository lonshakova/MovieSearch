<template>
  <div class="movie" v-if="this.movie">
    <v-img
      class="poster"
      :src="movie.poster.url"
      gradient="to right, rgba(44, 62, 80, 0.0), rgba(44, 62, 80, 0.0), rgba(44, 62, 80, 0.5), rgba(44, 62, 80, 1)"
      cover
    />
    <div class="inform">
      <div class="name">
        {{ movie.name }}
      </div>
      <div class="more-data">
        <div class="alt-name">
          {{ movie.alternativeName }}
        </div>
        <div class="type-and-timing" v-if="movie.type === 'movie'">
          фильм | {{ movie.year }} | {{ timing }}
        </div>
        <div class="type-and-timing" v-if="movie.type === 'cartoon'">
          мультфильм | {{ movie.year }} | {{ timing }}
        </div>
        <div class="type-and-timing" v-if="movie.type === 'tv-series'">
          сериал | {{ movie.releaseYears[0].start }}-{{
            movie.releaseYears[0].end
          }}
          | длина серии {{ timing }}
        </div>
        <div class="type-and-timing" v-if="movie.type === 'animated-series'">
          мультсериал | {{ movie.releaseYears[0].start }}-{{
            movie.releaseYears[0].end
          }}
          | длина серии {{ timing }}
        </div>
      </div>
      <div class="icons">
        <v-btn class="icon" @click="localMarkMovie()" icon="mdi-bookmark">
          <v-icon
            :color="
              isMarked ? 'rgba(33, 194, 248, 0.8)' : 'rgba(189, 195, 199, 0.6)'
            "
          />
        </v-btn>
        <div @click="changeRating = !changeRating">
          <v-btn class="icon" v-if="!userRate" icon="mdi-star" />
          <div class="icon-number" v-else>
            {{ userRate }}
          </div>
        </div>
      </div>
      <div class="slider" v-show="changeRating">
        <v-slider
          v-model="userRate"
          @click="rateMovie(userRate, movie.id)"
          show-ticks="always"
          step="0.5"
          max="10"
          min="0"
        />
      </div>
      <div class="ratings">
        <div>
          <div>
            Кинопоиск <b class="value">{{ movie.rating.kp }}</b>
          </div>
          <div>
            IMBd <b class="value">{{ movie.rating.imdb }}</b>
          </div>
        </div>
        <div>
          <div>
            Оценка критиков в России
            <b class="value">{{ movie.rating.russianFilmCritics }}</b>
          </div>
          <div>
            Оценка критиков в мире
            <b class="value">{{ movie.rating.filmCritics }}</b>
          </div>
        </div>
      </div>
      <div class="description">
        {{ movie.description }}
      </div>
      <div class="watchability" v-if="movie.watchability.items">
        Смотреть на
        <div class="servises">
          <div
            class="servis"
            v-for="servis in movie.watchability.items"
            :key="servis.id"
          >
            <a :href="servis.url">
              <v-img class="logo" :src="servis.logo.url" />
            </a>
          </div>
        </div>
      </div>
      <div class="recommendation-list">
        <div>Рекомендуем посмотреть</div>
        <div class="cards">
          <div
            class="recommendation"
            v-for="recommendation in recommendations"
            :key="recommendation.id"
          >
            <movie-card :movie="recommendation" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { watch } from 'vue';
import MovieCard from "../components/MovieCard.vue";
import { useMoviesStore } from "../store/movieStore";
export default {
  setup() {
    const moviesStore = useMoviesStore();
    return {
      moviesStore,
    };
  },
  components: {
    MovieCard,
  },
  data() {
    return {
      isMarked: false,
      changeRating: false,
      userRate: 0,
      recommendations: [],
    };
  },
  computed: {
    movie() {
      return this.moviesStore.allMovies.find(
        (movie) => movie.id == this.$route.params.id
      );
    },
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
    localMarkMovie() {
      this.moviesStore.allMarks = JSON.parse(localStorage.getItem("marks")) || [];
      this.isMarked = !this.isMarked;
      this.moviesStore.markMovie(this.movie.id);
    },
    rateMovie(userRating, id) {
      this.changeRating = !this.changeRating;
      this.moviesStore.rateMovie(userRating, id);
    },
  },

  created() {
    this.moviesStore.fetchMovies();
    this.userRate = localStorage.getItem(this.$route.params.id);
    this.moviesStore.allMarks = JSON.parse(localStorage.getItem("marks")) || [];
    this.isMarked = this.moviesStore.allMarks.some((mark) => mark == this.$route.params.id);
  },
  mounted() {
    watch(() => this.movie, () => {
      if (this.moviesStore.constMovies.length > 3 ) {
        this.recommendations = this.moviesStore.recomendMovies(this.$route.params.id);
      }
    }, {deep: true});
  }
};
</script>

<style scoped>
.movie {
  display: flex;
  justify-content: space-between;
}

.poster {
  width: 40%;
}

.inform {
  padding-right: 50px;
  width: 60%;
  display: flex;
  align-items: end;
  text-align: end;
  flex-direction: column;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

.name {
  font-weight: 900;
  color: rgba(243, 247, 248, 0.9);
  font-size: 64px;
}

.more-data {
  font-weight: 100;
  color: rgba(243, 247, 248, 0.7);
  font-size: 32px;
  font-style: italic;
  display: flex;
  text-align: end;
  flex-direction: column;
}

.type-and-timing {
  font-size: 25px;
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
  font-size: 25px;
  border-radius: 30px;
  background-color: rgba(32, 32, 32, 0.6);
  color: rgba(189, 195, 199, 0.6);
  cursor: pointer;
}

.icon-number {
  height: 50px;
  width: 50px;
  margin-right: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  border-radius: 30px;
  background-color: rgba(32, 32, 32, 0.6);
  color: rgba(33, 194, 248, 0.8);
  cursor: pointer;
}

.slider {
  margin: 20px 0px;
  padding: 0px 15px;
  padding-top: 12px;
  width: 600px;
  height: 60px;
  border-radius: 30px;
  background-color: rgba(243, 247, 248, 0.8);
}

.ratings {
  width: 600px;
  font-weight: 100;
  color: rgba(243, 247, 248, 1);
  font-size: 24px;
  display: flex;
  text-align: end;
  justify-content: space-between;
}

.value {
  color: #21c2f8;
}

.description {
  font-weight: 100;
  color: rgba(243, 247, 248, 0.7);
  font-size: 22px;
  display: flex;
  text-align: end;
}

.watchability {
  text-align: end;
  font-weight: 500;
  color: rgba(243, 247, 248, 1);
  font-size: 32px;
  font-style: italic;
}

.servises {
  display: flex;
  justify-content: end;
}

.servis {
  margin: 10px;
  width: 70px;
  height: 70px;
}

.logo {
  border-radius: 40px;
}

.recommendation-list {
  text-align: end;
  font-weight: 500;
  color: rgba(243, 247, 248, 1);
  font-size: 32px;
  font-style: italic;
}

.cards {
  display: flex;
  justify-content: end;
}

.recommendation {
  transform: scale(0.8);
  transform-origin: right top;
}
</style>
