<template>
  <div class="spring-analysis el-container">
    <el-container>

      <!-- Main -->
      <el-container>

        <!-- Body -->
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="组件耗时分析" name="components-analysis">
            <ComponentsAnalysis style="height: 100vh"/>
          </el-tab-pane>
          <el-tab-pane label="Bean耗时分析" name="bean-creation-analysis">
            <BeanCreationAnalysis/>
          </el-tab-pane>
          <el-tab-pane label="方法调用耗时分析" name="method-invoke-analysis">
            <MethodInvokeAnalysis/>
          </el-tab-pane>
          <el-tab-pane label="未被加载的Jar包" name="class-loader-unload-jar-analysis">
            <ClassLoaderUnloadJarAnalysis/>
          </el-tab-pane>
          <el-tab-pane label="性能火焰图" name="flame-graph-analysis">
            <FlameGraphAnalysis/>
          </el-tab-pane>
        </el-tabs>

      </el-container>

    </el-container>
  </div>
</template>

<script>
import ComponentsAnalysis from "./ComponentsAnalysis.vue";
import BeanCreationAnalysis from "./BeanCreationAnalysis.vue";
import MethodInvokeAnalysis from "./MethodInvokeAnalysis.vue";
import ClassLoaderUnloadJarAnalysis from "./ClassLoaderUnloadJarAnalysis.vue";
import FlameGraphAnalysis from "./FlameGraphAnalysis.vue";

export default {
  name: 'SpringAnalysis',
  components: {
    ComponentsAnalysis,
    BeanCreationAnalysis,
    MethodInvokeAnalysis,
    ClassLoaderUnloadJarAnalysis,
    FlameGraphAnalysis
  },
  data() {
    return {
      activeName: 'class-loader-unload-jar-analysis'
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
}
</script>

<style scoped>

.spring-analysis {
  height: 100%;
  width: 100%;
}

.el-header {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

body > .el-container {
  margin-bottom: 5px;
  height: 100%;
}

.el-tabs {
  height: 100%;
  width: 100%;
}

.el-tab-pane {
  height: 100%;
  width: 100%;
}

.first {
  height: 100%;
  width: 100%;
}
</style>
