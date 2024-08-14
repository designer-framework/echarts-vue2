<template>
  <div class="spring-boot-info">

    <el-table
      v-loading="loading"
      :data="tableData"
      :show-header=false
      border
      element-loading-spinner="el-icon-loading"
      element-loading-text="拼命加载中"
      row-key="id"
      size="mini"
      style="width: 100%;">
      <el-table-column
        align="center"
        min-width="10%"
        prop="label">
      </el-table-column>
      <el-table-column
        align="center"
        min-width="10%"
        prop="value">
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
import {$api} from "../common/utils/request";

export default {
  name: "SpringApplicationInfo",
  mounted() {
    $api('statisticsList', labelList => {

      this.tableData = labelList;
      this.loading = false;

    })
  },
  data() {
    return {
      loading: true,
      tableData: []
    }
  },

  methods: {}

}
;
</script>

<style scoped>
.spring-boot-info {
}
</style>
