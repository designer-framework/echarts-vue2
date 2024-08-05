<template>
  <div class="bean-creation-analysis">

    <el-table
      :data="getTableData()"
      style="width: 100%"
      :row-key="(data)=>data.parentId + '-' + data.id"
      border
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
      <el-table-column
        fixed="left"
        label="Bean名称"
        width="800">
        <template slot-scope="scope">
          <el-tag size="medium">{{ scope.row.name }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        fixed="left"
        label="创建Bean耗时/ms"
        width="200">
        <template slot-scope="scope">
          {{ scope.row.duration }}
        </template>
      </el-table-column>
      <el-table-column
        fixed="left"
        label="创建Bean真实耗时/ms">
        <template slot-scope="scope">
          {{ scope.row.actualDuration }}
        </template>
      </el-table-column>
      <el-table-column
        sortable
        align="right">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            placeholder="创建Bean耗时/ms 或 Bean名称"/>
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
        tags: {}
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

  }
};
</script>

<style scoped>
.bean-creation-analysis {
}
</style>
