<template>
  <div class="spring-boot-info">
    <div>
      <el-row>
        <el-col>
          <el-card v-for="item in tableData" :key="item.label" shadow="hover" style="width: 100%;">
            <div style="width: 100%; display: inline-block; ">
              <el-statistic :title="getTitle(item)">
                <template slot="suffix">
                  {{ item.value }}
                </template>
              </el-statistic>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
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
      tableData: []
    }
  },

  methods: {
    getTitle(item) {
      return "🎉" + item.label + "🎉";
    }
  }

}
;
</script>

<style scoped>
.spring-boot-info {
}

.like {
  cursor: pointer;
  font-size: 25px;
  display: inline-block;
}
</style>
