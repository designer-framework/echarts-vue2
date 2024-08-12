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
        </template>
      </el-table-column>

      <el-table-column
        label="方法名"
        prop="method"
        width="1000">
      </el-table-column>

      <el-table-column
        label="调用次数"
        prop="invokeCount">
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
import {$api} from "../common/utils/request";

export default {
  name: "MethodInvokeAnalysis",
  mounted() {
    $api('methodInvokeDetailList', methodInvokeDetailList => {
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

  }
};
</script>

<style scoped>
.method-invoke-analysis {
}
</style>
