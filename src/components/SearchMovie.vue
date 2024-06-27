<template>
  <div class="search-movie">
    <div class="search">
      <v-text-field
        class="text"
        placeholder="Введите название фильма..."
        variant="plain"
        append-inner-icon="mdi-magnify"
        v-model="moviesStore.searchQuery"
      />
    </div>
    <div class="select">
      <v-select
        class="select-item"
        :items="items"
        v-model="moviesStore.selectedSort.value"
        item-title="name"
        variant="plain"
      />
    </div>
  </div>
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
      items: [
        { value: "name", name: "По названию" },
        { value: "year", name: "По году" },
        { value: "rating", name: "По рейтингу" },
        { value: "movieLength", name: "По длительности" },
      ],
    };
  },
};
</script>

<style scoped>
.search-movie {
  margin-top: 45px;
  margin-left: 75px;
  width: 1000px;
  display: flex;
}

.text {
  padding-left: 10px;
  font-weight: 700;
}

.search {
  margin-left: 10px;
  padding-right: 15px;
  padding-left: 10px;
  padding-top: 5px;
  border-radius: 30px;
  height: 45px;
  width: 700px;
  background-color: #f3f7f8;
  border-radius: 30px;
  display: flex;
  justify-content: end;
  align-items: center;
  font-size: 36px;
}

.material-symbols-outlined {
  color: #bdc3c7;
  font-size: 36px;
  cursor: pointer;
}

.select {
  margin-left: 10px;
  padding-right: 0px;
  padding-left: 20px;
  padding-top: 5px;
  height: 45px;
  width: fit-content;
  min-width: 170px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  font-weight: 700;
  color: #202020;
  background-color: #f3f7f8;
  border-radius: 30px;
}

.select-item {
  font-weight: 700;
}
</style>
