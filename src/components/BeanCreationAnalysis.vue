<template>
  <div class="bean-creation-analysis">

    <el-input
      v-model="search"
      placeholder="创建Bean耗时/ms 或 Bean名称"
      size="mini"/>

    <el-table
      :data="getTableData()"
      :row-key="(data)=>data.id"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      border
      style="width: 100%"
      @row-click="handleRowClick">
      <el-table-column
        fixed="left"
        label="Bean名称"
        width="auto">
        <template slot-scope="scope">
          <el-tag size="medium">{{ scope.row.name }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        fixed="left"
        label="创建Bean耗时/ms"
        width="auto">
        <template slot-scope="scope">
          {{ scope.row.duration }}
        </template>
      </el-table-column>
      <el-table-column
        fixed="left"
        label="创建Bean真实耗时/ms"
        width="auto">
        <template slot-scope="scope">
          {{ scope.row.actualDuration }}
        </template>
      </el-table-column>
      <el-table-column
        align="left"
        width="auto">
        <template slot-scope="scope">
          <span v-for="(value, key) in scope.row.tags">
              {{ key }}: {{ value }}
            <br/>
          </span>
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

    handleRowClick(row, column, event) {
      return !row.isShow;
    }

  }
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

</style>
