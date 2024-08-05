<template>
  <div class="method-invoke-analysis">

    <el-table
      :data="tableData"
      style="width: 100%"
      :row-key="(data) => data.method"
      border
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
      <el-table-column
        fixed="left"
        label="方法名"
        width="1000">
        <template slot-scope="scope">
          {{ scope.row.method }}
          <el-table
            :data="scope.row.invokeDetails"
            style="width: 100%; margin-top: 10px"
            border>
            <el-table-column
              fixed="left"
              label="入参/类名"
              width="auto">
              <template slot-scope="scope">
                {{ scope.row.args }}
              </template>
            </el-table-column>
            <el-table-column
              fixed="left"
              label="耗时"
              width="auto">
              <template slot-scope="scope">
                {{ scope.row.duration }}
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column
        fixed="left"
        label="调用次数"
        width="auto">
        <template slot-scope="scope">
          {{ scope.row.invokeCount }}
        </template>
      </el-table-column>
      <el-table-column
        fixed="left"
        label="总耗时">
        <template slot-scope="scope">
          {{ scope.row.totalCost }}
        </template>
      </el-table-column>
      <el-table-column
        fixed="left"
        label="平均耗时">
        <template slot-scope="scope">
          {{ scope.row.averageCost }}
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
export default {
  name: "MethodInvokeAnalysis",
  mounted() {
    this.loadData()
      .then(data => {
        this.tableData = data.methodInvokeDetailList;
      })
  },
  data() {
    return {
      tableData: [{
        method: '',
        invokeCount: -1,
        totalCost: -1,
        averageCost: -1,
        invokeDetails: [],
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

  }
};
</script>

<style scoped>
.method-invoke-analysis {
}
</style>
