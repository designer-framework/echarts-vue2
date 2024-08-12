<template>
  <div class="spring-analysis el-container">
    <el-container>

      <!-- Main -->
      <el-container>

        <!-- Body -->
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane :lazy="true" name="components-analysis">
            <span slot="label"><i class="el-icon-pie-chart"></i> 组件耗时分析</span>
            <ComponentsAnalysis style="height: 100vh"/>
          </el-tab-pane>
          <el-tab-pane :lazy="true" name="bean-creation-analysis">
            <span slot="label"><i class="el-icon-soccer"></i> Bean耗时分析</span>
            <BeanCreationAnalysis/>
          </el-tab-pane>
          <el-tab-pane :lazy="true" name="method-invoke-analysis">
            <span slot="label"><i class="el-icon-files"></i> 方法调用耗时分析</span>
            <MethodInvokeAnalysis/>
          </el-tab-pane>
          <el-tab-pane :lazy="true" name="class-loader-unload-jar-analysis">
            <span slot="label"><i class="el-icon-no-smoking"></i> 未被加载的Jar包</span>
            <ClassLoaderUnloadJarAnalysis/>
          </el-tab-pane>
          <el-tab-pane :lazy="true" name="flame-graph-analysis">
            <span slot="label"><i class="el-icon-s-marketing"></i> 性能火焰图</span>
            <FlameGraphAnalysis/>
          </el-tab-pane>
          <el-tab-pane :lazy="true" name="test-analysis">
            <span slot="label"><i class="el-icon-more-outline"></i> ElementUI测试页面</span>
            <TestAnalysis/>
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
import TestAnalysis from "./TestAnalysis.vue";

export default {
  name: 'SpringAnalysis',
  components: {
    ComponentsAnalysis,
    BeanCreationAnalysis,
    MethodInvokeAnalysis,
    ClassLoaderUnloadJarAnalysis,
    FlameGraphAnalysis,
    TestAnalysis
  },
  data() {
    return {
      activeName: 'method-invoke-analysis'
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
