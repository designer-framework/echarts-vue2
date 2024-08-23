<template>
  <div class="spring-analysis el-container" v-loading="loading">
    <el-container>
      <el-header height="100px">
        SpringAgent 应用启动耗时分析
      </el-header>
      <el-container>
        <el-main>
          <el-row :gutter="20">

            <el-col :span="24">
              <div class="grid-content bg-purple">
                <el-card class="box-card">
                  <div slot="header" class="clearfix">
                    <span class="card_title">Spring基本信息</span>
                  </div>

                  <div>
                    <SpringApplicationInfo/>
                  </div>
                </el-card>
              </div>
            </el-col>

            <el-col :span="24">
              <div class="grid-content bg-purple">
                <el-card class="box-card">
                  <div slot="header" class="clearfix">
                    <span class="card_title">组件耗时分析</span>
                  </div>
                  <div>
                    <BeanCreationAnalysis/>
                  </div>
                </el-card>
              </div>
            </el-col>
            <el-col :span="24">
              <div class="grid-content bg-purple">
                <el-card class="box-card">
                  <div slot="header" class="clearfix">
                    <span class="card_title">Bean耗时分析</span>
                    <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
                  </div>
                  <div>
                    <ComponentsAnalysis style="height: 100vh"/>
                  </div>
                </el-card>
              </div>
            </el-col>

            <el-col :span="24">
              <div class="grid-content bg-purple">
                <el-card class="box-card">
                  <div slot="header" class="clearfix">
                    <span class="card_title">未被加载的Jar包</span>
                    <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
                  </div>
                  <div>
                    <el-card class="box-card" style="margin-bottom: 23px;">
                      <div slot="header" class="clearfix">
                        <span class="card_title">统计数据</span>
                      </div>
                      <el-row :gutter="20">
                        <el-col :span="6">
                          <div>
                            <el-statistic group-separator="," :precision="2" :value="value2"
                                          :title="title"></el-statistic>
                          </div>
                        </el-col>
                        <el-col :span="6">
                          <div>
                            <el-statistic title="男女比">
                              <template slot="formatter">
                                456/2
                              </template>
                            </el-statistic>
                          </div>
                        </el-col>
                        <el-col :span="6">
                          <div>
                            <el-statistic group-separator="," :precision="2" decimal-separator="." :value="value1"
                                          :title="title">
                              <template slot="prefix">
                                <i class="el-icon-s-flag" style="color: red"></i>
                              </template>
                              <template slot="suffix">
                                <i class="el-icon-s-flag" style="color: blue"></i>
                              </template>
                            </el-statistic>
                          </div>
                        </el-col>
                        <el-col :span="6">
                          <div>
                            <el-statistic :value="like ? 521 : 520" title="Feedback">
                              <template slot="suffix">
                                <span @click="like = !like" class="like">
                                  <i class="el-icon-star-on" style="color:red" v-show="!!like"></i>
                                  <i class="el-icon-star-off" v-show="!like"></i>
                                </span>
                              </template>
                            </el-statistic>
                          </div>
                        </el-col>
                      </el-row>
                    </el-card>
                    <el-card class="box-card">
                      <ClassLoaderUnloadJarAnalysis/>
                    </el-card>
                  </div>
                </el-card>
              </div>
            </el-col>

            <el-col :span="24">
              <div class="grid-content bg-purple">
                <el-card class="box-card">
                  <div slot="header" class="clearfix">
                    <span class="card_title">性能火焰图</span>
                  </div>
                  <div>
                    <FlameGraphAnalysis/>
                  </div>
                </el-card>
              </div>
            </el-col>

          </el-row>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import {$api} from "../common/utils/request";
import SpringApplicationInfo from "./SpringApplicationInfo.vue";
import ComponentsAnalysis from "./ComponentsAnalysis.vue";
import BeanCreationAnalysis from "./BeanCreationAnalysis.vue";
import MethodInvokeAnalysis from "./MethodInvokeAnalysis.vue";
import ClassLoaderUnloadJarAnalysis from "./ClassLoaderUnloadJarAnalysis.vue";
import FlameGraphAnalysis from "./FlameGraphAnalysis.vue";
import TestAnalysis from "./TestAnalysis.vue";

export default {
  name: 'SpringAnalysis',
  components: {
    SpringApplicationInfo,
    ComponentsAnalysis,
    BeanCreationAnalysis,
    MethodInvokeAnalysis,
    ClassLoaderUnloadJarAnalysis,
    FlameGraphAnalysis,
    TestAnalysis
  },
  mounted() {
    this.getTableData()
  },
  data() {
    return {
      activeName: 'method-invoke-analysis',
      loading: true
    };
  },
  methods: {
    getTableData() {
      $api('', allData => {
        this.tableData = allData;
        this.loading = false;
      })
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
  display: flex;
  justify-content: space-around;
  align-items: center;
  /* height: 160px; */
  background-color: #002140;
  color: #FFF;
  text-align: center;
  /* line-height: 60px; */
}

.spring_title {
  font-size: 20px;
  font-weight: 500;
}

.spring_text {
  padding-left: 16px;
  font-size: 18px;
  color: #1890ff;
  /* font-weight: 500; */
}

.bg-purple {
  margin-top: 30px;
}

.card_title {
  color: #1890ff;
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
