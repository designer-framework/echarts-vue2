<template>
  <div id="app">
    <SpringAnalysis/>
  </div>
</template>

<script>
import SpringAnalysis from './components/SpringAnalysis.vue'

export default {
  name: 'App',
  components: {
    SpringAnalysis
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

html,body,#app {
  height: 100%;
  margin: 0px;
}

html, body {
  width: 100%;
  height: 100%;
}

#app {
}
</style>
