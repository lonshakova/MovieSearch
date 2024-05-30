<template>
  <header-menu/>
  <v-app id="app">
    <router-view/>
  </v-app>
</template>

<script>
import HeaderMenu from './components/HeaderMenu.vue';
export default {
  components:{
    HeaderMenu
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
#app{
  min-height: 100vh;
  background-color: #2C3E50;
}
</style>