<template>
  <div class="class-loader-unload-jar-analysis">

    <el-table
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
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
import {$api} from "../common/utils/request";

export default {
  name: "ClassLoaderUnloadJarAnalysis",
  mounted() {
    $api('unusedJarMap', unusedJarMap => {
        let unusedJarArray = [];

        for (const [classLoader, classes] of Object.entries(unusedJarMap)) {

          unusedJarArray.push({
            id: classLoader,
            name: classLoader,
            children: classes.map((clazz) => {
              return {
                id: clazz,
                name: clazz
              };
            })
          });

        }

        this.tableData = unusedJarArray;
        this.loading = false;
      })
  },
  data() {
    return {
      loading: true,
      tableData: []
    }
  },

  methods: {

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
