<template>
  <div class="spring">
    <el-container>
      <!-- Header -->
      <el-header>Header</el-header>

      <!-- Main -->
      <el-container>

        <!-- Body -->
        <el-container>
          <el-aside width="100%">
            <el-tabs :tab-position="tabPosition" style="height: 200px;">
              <el-tab-pane label="Spring Bean Initialization">1</el-tab-pane>
              <el-tab-pane label="Bean Initailization Timeline">2</el-tab-pane>
              <el-tab-pane label="Details of Method Invoke">3</el-tab-pane>
              <el-tab-pane label="PieRichText_1">
                <PieRichText_1/>
              </el-tab-pane>
            </el-tabs>
          </el-aside>

          <!-- Footer -->
          <el-footer>Footer</el-footer>

        </el-container>

      </el-container>

    </el-container>
  </div>
</template>

<script>
import SpringAside from "./SpringAside.vue";
import PieRichText_1 from "./PieRichText_1.vue";

export default {
  name: 'Spring',
  components: {SpringAside, PieRichText_1},
  data() {
    return {
      tabPosition: 'left'
    };
  },
  methods: {}
}
</script>

<style scoped>
.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
