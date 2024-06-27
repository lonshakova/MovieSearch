<template>
  <div class="marks">
    <SearchMovie />
    <CardList />
    <PagesNumbers />
  </div>
</template>

<script>
import SearchMovie from "../components/SearchMovie.vue";
import CardList from "../components/CardList.vue";
import PagesNumbers from "../components/PagesNumbers.vue";
import { useMoviesStore } from "../store/movieStore";
export default {
  setup() {
    const moviesStore = useMoviesStore();
    return {
      moviesStore,
    };
  },
  components: {
    SearchMovie,
    CardList,
    PagesNumbers,
  },
  created() {
    this.moviesStore.fetchMoviesMarks();
  },
};
</script>
