<template>
  <div class="class-loader-unload-jar-analysis">

    <el-table
      :data="tableData"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
      <el-table-column
        prop="name"
        label="类加载器中未加载的Jar包"
        width="auto"
        min-width="50%">
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
export default {
  name: "ClassLoaderUnloadJarAnalysis",
  beforeMount() {
   this.loadData()
      .then(data => {
        let unusedJarArray = [];

        for (const [key, value] of Object.entries(data.unusedJarMap)) {

          unusedJarArray.push({
            id: key,
            name: key,
            children: value.map((clazz) => {
              return {
                id: clazz,
                name: clazz
              };
            })
          });

        }

        this.tableData = unusedJarArray;
      })
  },
  data() {
    return {
      tableData: []
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

}
;
</script>

<style scoped>
.class-loader-unload-jar-analysis {
}

.el-table__body tbody tr:first-child td:nth-child(3) {
  width: 100%;
}
</style>
