<template>
  <div class="bean-creation-analysis">

    <el-input
      v-model="search"
      placeholder="创建Bean耗时/ms 或 Bean名称"
      size="mini"/>

    <el-table
      :data="getTableData()"
      :row-key="(data)=>data.id"
      :row-class-name="tableRowClassName"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      :indent="46"
      border
      size="mini"
      style="width: 100%">

      <el-table-column
        fixed="left"
        label="Bean名称"
        width="auto"
        min-width="100%"
      >
        <template slot-scope="scope">
          <el-tag size="medium">{{ scope.row.name }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column
        prop="duration"
        label="创建Bean耗时/ms"
        width="auto">
      </el-table-column>

      <el-table-column
        label="创建Bean真实耗时/ms"
        prop="actualDuration"
        width="auto">
      </el-table-column>

      <el-table-column
        label="耗时明细/ms"
        width="auto">
        <template slot-scope="scope">
          <div v-if="scope.row.beanLifeCycles">
            <p v-if="scope.row.beanLifeCycles.createAopProxyClass">
              @. 创建AOP代理类耗时: {{ scope.row.beanLifeCycles.createAopProxyClass.duration }}
            </p>
            <p v-if="scope.row.beanLifeCycles.afterPropertiesSet">
              @. AfterPropertiesSet耗时: {{ scope.row.beanLifeCycles.afterPropertiesSet.duration }}
            </p>
            <p v-if="scope.row.beanLifeCycles.afterSingletonsInstantiated">
              @. AfterSingletonsInstantiated耗时: {{ scope.row.beanLifeCycles.afterSingletonsInstantiated.duration }}
            </p>
            <p v-if="scope.row.beanLifeCycles.afterSingletonsInstantiated">
              @. 其它耗时...
            </p>
          </div>
        </template>
      </el-table-column>

      <el-table-column
        label="Tags"
        width="auto">
        <template slot-scope="scope">
          <div>
            <p v-if="scope.row.tags.className">
              类&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp名: {{ scope.row.tags.className }}
            </p>
            <p v-if="scope.row.tags.threadName">
              创建线程: {{ scope.row.tags.threadName }}
            </p>
            <p v-if="scope.row.tags.classLoader">
              类加载器: {{ scope.row.tags.classLoader }}
            </p>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "BeanCreationAnalysis",
  mounted() {
    this.loadData()
      .then(data => {
        let createdBeans = data.beanInitResultList;
        this.tableData = createdBeans.sort(function (a, b) {
          return b.duration - a.duration
        });
      })
  },
  data() {
    return {
      tableData: [{
        id: -1,
        name: '',
        children: [],
        parentId: -1,
        actualDuration: -1,
        isShow: false,
        tags: {},
        beanLifeCycles: {
          prop: {
            stepName: '',
            duration: -1
          }
        }
      }],
      filterText: 100,
      search: ''
    }
  },

  methods: {

    async loadData() {
      const response = await fetch("http://127.0.0.1:9999/analysis/json", {
        method: "GET",
      });
      try {
        return await response.json();
      } catch (error) {
        console.error("An error occurred:", error.message);
      }
    },

    getTableData() {
      if (!this.search) {
        return this.tableData.filter(data => {
          return data.parentId === 0;
        });
      }

      if (!isNaN(Number.parseFloat(this.search)) && isFinite(this.search)) {
        return this.tableData.filter(data => (data.actualDuration > this.search) && data.parentId === 0)
      }

      return this.tableData.filter(data => (data.name.toLowerCase().includes(this.search.toLowerCase())) && data.parentId === 0);
    },

    tableRowClassName({row, rowIndex}) {
      if (row.actualDuration > 100) {
        console.log(row.name)
        return 'warning-row';
      } else if (rowIndex === 3) {
        return 'success-row';
      }
      return '';
    }
  },

};
</script>

<style scoped>
.bean-creation-analysis {
}

.demo-table-expand {
  font-size: 0;
}

.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}

.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}

.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}

</style>
