<script>
import IndexComponent from './components/Index.vue'

export default {
  name: 'App',
  components: {
    IndexComponent // Register the Index component
  }
}
</script>

<template>
  <Index-component msg="Devops"/>
</template>

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
