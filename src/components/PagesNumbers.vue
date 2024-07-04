<template>
  <div class="list-numbers">
    <v-btn
      variant="plain"
      class="arrow"
      v-if="totalPages > 1 && moviesStore.page > 0"
      icon="mdi-chevron-left"
      @click="updatePage(moviesStore.page - 1)"
    />
    <div v-for="number in totalPages" :key="number">
      <v-hover v-slot="{ isHovering, props }">
        <v-btn
          class="number"
          v-bind="props"
          :elevation="isHovering ? 12 : 2"
          v-if="number !== moviesStore.page + 1"
          min-width="40px"
          @click="updatePage(number - 1)"
        >
          {{ number }}
        </v-btn>
        <v-btn class="number-select" elevation="12" v-else min-width="40px">
          {{ number }}
        </v-btn>
      </v-hover>
    </div>
    <v-btn
      variant="plain"
      class="arrow"
      v-if="
        totalPages > 1 &&
        moviesStore.page < totalPages - 1
      "
      icon="mdi-chevron-right"
      @click="updatePage(moviesStore.page + 1)"
    />
  </div>
</template>

<script>
import { watch } from 'vue';
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
      
      
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.moviesStore.allMovies.length/this.moviesStore.limit);
    }
  },
  methods: {
    updatePage(number) {
      this.moviesStore.page = number;
    },
  },
  // mounted() {
  //   watch(() => this.moviesStore.searchMovies, () => {
  //     this.moviesStore.updateMovies(this.limit, this.page);
  //     this.page = 0;
  //   }, {deep: true});
  // },
  // updated() {
  //   this.moviesStore.updateMovies(this.limit, this.page);
  // }
};
</script>

<style scoped>
.list-numbers {
  margin: 20px;
  height: 75px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.number {
  margin: 0px 20px;
  width: 40px;
  min-height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgba(243, 247, 248, 0.5);
  background-color: rgba(33, 194, 248, 0.5);
  border-radius: 10px;
  font-size: 30px;
  font-weight: bold;
}

.number:hover {
  margin: 0px 15px;
  width: 50px;
  height: 75px;
  color: rgba(243, 247, 248, 1);
  background-color: rgba(33, 194, 248, 1);
}

.number-select {
  margin: 0px 15px;
  min-height: 75px;
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgba(243, 247, 248, 1);
  background-color: rgba(33, 194, 248, 1);
  border-radius: 10px;
  font-size: 30px;
  font-weight: bold;
}

.arrow {
  width: 20px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #2c3e50;
  font-size: 50px;
  color: rgba(32, 32, 32, 1);
}

.arrow:hover {
  color: rgba(16, 16, 16, 1);
}
</style>
