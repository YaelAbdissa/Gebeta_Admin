<template>
    <router-view></router-view>
  <Footer />
</template>

<script>
import Footer from './components/Footer'

export default {
  name: 'App',
  components: {
    Footer,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  border: 1px solid #eee;
  border-radius: 2px;
  padding: 10px 30px;
  margin: 2em;
  user-select: none;
  overflow-x: auto;
  background: rgb(238, 236, 233);
  border-radius: 1%;
}

body{
  background: rgb(228, 223, 216);
}
</style>
