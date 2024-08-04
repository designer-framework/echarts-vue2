<template>
  <div id="app">
    <Spring/>
  </div>
</template>

<script>
import Spring from './components/Spring.vue'

export default {
  name: 'App',
  components: {
    Spring
  }
}
</script>

<style>
html,
body {
  height: 100%;
  margin: 0px;
}

* {
  margin: 0;
  padding: 0;
}

html, body {
  width: 100%;
  height: 100%;
}

#app {
  height: 100%;
}
</style>
