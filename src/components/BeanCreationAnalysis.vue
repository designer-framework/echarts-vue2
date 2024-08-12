<template>
  <div class="bean-creation-analysis">

    <div>
      <el-input v-model="search.duration"
                placeholder="输入创建Bean耗时"
                size="mini"
                style="width: 20%">
        <template slot="prepend">Duration/(ms)</template>
      </el-input>
      <el-input v-model="search.beanName"
                placeholder="输入Bean名称"
                size="mini"
                style="width: 20%">
        <template slot="prepend">Bean Name</template>
      </el-input>
    </div>

    <el-table
      v-loading="loading"
      :data="getTableData()"
      :default-sort="defaultSort"
      :indent="16"
      :row-class-name="tableRowClassName"
      :row-key="(data) => data.id"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      border
      element-loading-spinner="el-icon-loading"
      element-loading-text="拼命加载中"
      size="mini"
      style="width: 100%">

      <el-table-column
        label="Bean name"
        min-width="100%"
      >
        <template slot-scope="scope">
          <el-popover
            placement="top-start"
            title="Spring Bean info"
            trigger="hover"
            width="100%">
            <div v-if="scope.row" STYLE="margin: 10px">
              <div v-for="(value, key) in scope.row.tags" class="text item bean-name">
                <el-tag class="bean-tag" size="small"> {{ key }}: <span>{{ value }}</span>
                </el-tag>
              </div>
            </div>
            <span slot="reference">
              <span class="bean-name"></span>
              <el-tag size="small">{{ scope.row.name }}</el-tag>
            </span>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column
        label="Duration/(ms)"
        prop="duration"
        width="180px">
      </el-table-column>

      <el-table-column
        label="ActualDuration/(ms)"
        prop="actualDuration"
        width="180px">
      </el-table-column>

      <el-table-column
        label="ActualDurationDetail/(ms)"
        width="auto">
        <template slot-scope="scope">
          <div v-if="scope.row.beanLifeCycles">
            <p v-if="scope.row.beanLifeCycles.createAopProxyClass">
              <span class="bean-name">
                &nbsp; CreateAopProxyClass: {{ scope.row.beanLifeCycles.createAopProxyClass.duration }}
              </span>
            </p>
            <p v-if="scope.row.beanLifeCycles.afterPropertiesSet">
              <span class="bean-name">
                &nbsp; AfterPropertiesSet: {{ scope.row.beanLifeCycles.afterPropertiesSet.duration }}
              </span>
            </p>
            <p v-if="scope.row.beanLifeCycles.afterSingletonsInstantiated">
              <span class="bean-name">
                &nbsp; AfterSingletonsInstantiated: {{
                  scope.row.beanLifeCycles.afterSingletonsInstantiated.duration
                }}
              </span>
            </p>
          </div>

        </template>

      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {$api} from "../common/utils/request";

export default {
  name: "BeanCreationAnalysis",
  mounted() {
    $api('beanInitResultList', createdBeans => {
        this.tableData = createdBeans;
        this.loading = false;
      })
  },
  data() {
    return {
      loading: true,
      defaultSort: {prop: 'duration', order: 'descending'},
      search: {
        beanName: '',
        duration: 100
      },
      tableData: [{
        id: -1,
        name: '',
        children: [],
        parentId: -1,
        duration: -1,
        actualDuration: -1,
        isShow: false,
        tags: {},
        beanLifeCycles: {
          prop: {
            stepName: '',
            duration: -1
          }
        }
      }]
    }
  },

  methods: {

    /**
     *
     * @returns {{children: *[], name: string, actualDuration: number, id: number, parentId: number, isShow: boolean, tags: {}, beanLifeCycles: {prop: {duration: number, stepName: string}}}[]}
     */
    getTableData() {
      return this.tableData.filter(data => {

        if (data.parentId !== 0) {
          return false;
        }

        if (data.duration < this.search.duration) {
          return false;
        }

        return !this.search.beanName || (data.name.toLowerCase().includes(this.search.beanName.toLowerCase()));
      });
    },

    /**
     *
     * @param row
     * @param rowIndex
     * @returns {string}
     */
    tableRowClassName({row, rowIndex}) {
      if (row.parentId === 0) {
        return '';
      }
      if (row.actualDuration > 600) {
        return 'error-row';
      } else if (row.actualDuration > 100) {
        return 'warning-row';
      } else {
        return 'success-row';
      }
    },

  },


};
</script>

<style>
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

.el-table .cell {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.el-table .error-row {
  background: #fef0f0;
}

.el-table .warning-row {
  background: #fdf6ec;
}

.el-table .success-row {
  background: #f0f9eb;
  /*#f4f4f5*/
}

.bean-name {
  border-left: 2px solid deepskyblue;
  margin-left: 3px;
  margin-right: 3px;
}

.bean-tag {
  background: #f0f9eb;
}

</style>
