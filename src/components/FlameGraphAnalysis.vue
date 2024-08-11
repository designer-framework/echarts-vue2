<template>
  <div class="flame-graph-analysis">
    <iframe
      :src="flameGraphUrl"
      allowfullscreen
      frameborder="0"
      height="100%">
    </iframe>
  </div>
</template>

<script>
export default {
  name: "FlameGraphAnalysis",
  data() {
    return {
      flameGraphUrl: "http://127.0.0.1:9999/flame-graph.html"
    }
  }
}
</script>

<style scoped>
.flame-graph-analysis {
  width: 100%;
  height: 100vh; /* 视口高度，100%的屏幕高度 */
}

html, body {
  margin: 0 0;
  width: 100%;
  height: 100%;
}

iframe {
  margin: 0 0;
  width: 100%;
  height: 100%;
}
</style>
