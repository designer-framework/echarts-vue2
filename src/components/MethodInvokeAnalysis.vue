<template>
  <div class="method-invoke-analysis">

    <el-table
      v-loading="loading"
      :data="tableData"
      :default-sort="defaultSort"
      :row-key="(data) => data.method"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      border
      element-loading-spinner="el-icon-loading"
      element-loading-text="拼命加载中"
      size="medium"
      sort="invokeCount"
      style="width: 100%">

      <el-table-column
        type="expand"
        width="100%">
        <template slot-scope="scope">
          <el-collapse-transition>
            <div>
              <el-table
                :data="scope.row.invokeDetails"
                :default-sort="childTableSort"
                border
                size="medium"
                style="width: 100%;">
                <el-table-column width="100%">
                </el-table-column>
                <el-table-column type="index">
                </el-table-column>
                <el-table-column
                  :show-overflow-tooltip="true"
                  label="入参/类名"
                  prop="args">
                </el-table-column>
                <el-table-column
                  label="耗时/ms"
                  prop="duration"
                  sortable>
                </el-table-column>
              </el-table>
            </div>
          </el-collapse-transition>
        </template>
      </el-table-column>

      <el-table-column
        label="方法名"
        prop="method"
        width="1000">
      </el-table-column>

      <el-table-column
        label="调用次数"
        prop="invokeCount"
        width="auto">
      </el-table-column>

      <el-table-column
        label="总耗时/ms"
        prop="totalCost"
        sortable>
      </el-table-column>

      <el-table-column
        label="平均耗时/ms"
        prop="averageCost">
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
export default {
  name: "MethodInvokeAnalysis",
  mounted() {
    this.loadData()
      .then(methodInvokeDetailList => {
        this.tableData = methodInvokeDetailList.filter((data) => {
          {
            this.$set(data, 'isShow', false)
            return data;
          }
        });
        this.loading = false;
      })
  },
  data() {
    return {
      loading: true,
      tableData: [],
      search: 100,
      defaultSort: {prop: 'totalCost', order: 'descending'},
      childTableSort: {prop: 'duration', order: 'descending'},
    }
  },

  methods: {

    async loadData() {
      const response = await fetch("http://127.0.0.1:9999/analysis/json?type=methodInvokeDetailList", {
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
