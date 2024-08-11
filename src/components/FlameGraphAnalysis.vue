<template>
  <div class="flame-graph-analysis">
    <iframe
      :src="flameGraphUrl"
      allowfullscreen
      frameborder="0"
      height="100%"
      width="100%"
    >
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
}
</style>
