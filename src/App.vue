<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" width="80">
    <MainBody heading="Consuming API Assignment in Vue.js"/>
  </div>
</template>

<script>
import MainBody from './components/MainBody.vue'

export default {
  name: 'App',
  components: {
    MainBody
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
