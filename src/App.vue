<template>
  <div id="app">
    <!-- <HelloWorld /> -->
<!--     <PieRichText0 /> -->
    <PieRichText1 />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import PieRichText0 from './components/PieRichText_0.vue'
import PieRichText1 from './components/PieRichText_1.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
    PieRichText0,
    PieRichText1
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

html, body{
  width: 100%;
  height: 100%;
}

#app {
  height: 100%;
}
</style>
