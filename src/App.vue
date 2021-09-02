<template>
  <div id="nav">
    <notifications />
    <Header></Header>
  </div>
  <router-view/>
</template>
<script>
// @ is an alias to /src
import Header from "@/partials/Header";
export default {
  name: 'Home',
  components: {
    Header
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
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
