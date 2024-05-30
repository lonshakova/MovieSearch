import { createWebHistory, createRouter } from "vue-router";
import MainPage from "../pages/MainPage.vue";
import MarksPage from "../pages/MarksPage.vue";
import RatingsPage from "../pages/RatingsPage.vue";
import MoviePage from "../pages/MoviePage.vue";

const routes = [
  {
    path: '/',
    component: MainPage
  },
  {
    path: '/marks',
    component: MarksPage
  }, 
  {
    path: '/ratings',
    component: RatingsPage
  }, 
  {
    path: '/movie/:id',
    component: MoviePage
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;