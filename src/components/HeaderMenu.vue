<template>
  <v-toolbar class="toolbar">
    <v-toolbar-title 
      class="logo" 
      @click="GoToMain"
    >
      SearchMovie
    </v-toolbar-title>
    <div class="btns">
      <v-hover v-slot="{ isHovering, props }">
        <v-btn 
          round 
          class="btn" 
          v-bind="props" 
          @click="GoToMain"
        >
          <v-icon icon="mdi-home" />
          <div 
            v-if="isHovering" 
            class="name_btn"
          >
            Главная
          </div>
        </v-btn>
      </v-hover>
      <v-hover v-slot="{ isHovering, props }">
        <v-btn 
          class="btn" 
          v-bind="props"
          @click="GoToMarks"
        >
          <v-icon icon="mdi-bookmark" />
          <div 
            v-if="isHovering" 
            class="name_btn"
          >
            Закладки
          </div>
        </v-btn>
      </v-hover>
      <v-hover v-slot="{ isHovering, props }">
        <v-btn 
          class="btn" 
          v-bind="props" 
          @click="GoToRates"
        >
          <v-icon icon="mdi-star" />
          <div 
            v-if="isHovering" 
            class="name_btn"
          >
            Оценки
          </div>
        </v-btn>
      </v-hover>
    </div>
  </v-toolbar>
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
  methods: {
    GoToMain() {
      this.$router.push("/");
      this.moviesStore.page = 0;
    },
    GoToMarks() {
      this.$router.push("/marks");
      this.moviesStore.page = 0;
    },
    GoToRates() {
      this.$router.push("/ratings");
      this.moviesStore.page = 0;
    },
  },
};
</script>

<style scoped>
.toolbar {
  height: 70px;
  background-color: #202020;
}

.logo {
  padding: 10;
  height: 100%;
  display: flex;
  align-items: center;
  color: #21c2f8;
  font-size: 40px;
  font-weight: 900;
  line-height: 1.5;
  cursor: pointer;
}

.btn {
  margin: 5px;
  width: max-content;
  background-color: #21c2f8;
  border-radius: 90px;
  color: #202020;
  font-size: 30px;
}

.btn:hover {
  width: max-content;
}

.name_btn {
  font-size: 20px;
  font-weight: 900;
}
</style>
