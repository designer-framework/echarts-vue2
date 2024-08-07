<template>
  <div class="bean-creation-analysis">

    <el-input
      v-model="search"
      placeholder="创建Bean耗时/ms 或 Bean名称"
      size="mini"/>

    <el-table
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      :data="getTableData()"
      :row-key="(data)=>data.id"
      :row-class-name="tableRowClassName"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      :indent="16"
      border
      size="mini"
      style="width: 100%">

      <el-table-column
        fixed="left"
        label="Bean name"
        min-width="100%"
      >
        <template slot-scope="scope">
          <el-popover
            placement="top-start"
            title="Bean Info"
            width="100%"
            trigger="hover">
            <div  v-if="scope.row">
              <div v-for="(value, key) in scope.row.tags" class="text item">
                <span style="font-style: italic">{{ key }}</span>: <span>{{ value }}</span>
                <br/>
                <br/>
              </div>
            </div>
            <span slot="reference">
              <span class="bean-name"></span>
              <el-tag size="medium">{{ scope.row.name }}</el-tag>
            </span>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column
        prop="duration"
        label="Duration/(ms)"
        width="80px">
      </el-table-column>

      <el-table-column
        prop="actualDuration"
        label="ActualDuration/(ms)"
        width="80px">
      </el-table-column>

      <el-table-column
        label="DurationDetail/(ms)"
        width="auto">
        <template slot-scope="scope">
          <div v-if="scope.row.beanLifeCycles">
            <p v-if="scope.row.beanLifeCycles.createAopProxyClass">
              @. 创建AOP代理类耗时: {{ scope.row.beanLifeCycles.createAopProxyClass.duration }}
            </p>
            <p v-if="scope.row.beanLifeCycles.afterPropertiesSet">
              @. AfterPropertiesSet耗时: {{ scope.row.beanLifeCycles.afterPropertiesSet.duration }}
            </p>
            <p v-if="scope.row.beanLifeCycles.afterSingletonsInstantiated">
              @. AfterSingletonsInstantiated耗时: {{
                scope.row.beanLifeCycles.afterSingletonsInstantiated.duration
              }}
            </p>
            <p v-if="scope.row.beanLifeCycles.afterSingletonsInstantiated">
              @. 其它耗时...
            </p>
          </div>

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
        this.loading = false;
      })
  },
  data() {
    return {
      loading: true,
      tableData: [{
        id: -1,
        name: '',
        children: [],
        parentId: -1,
        actualDuration: -1,
        isShow: false,
        tags: {},
        beanLifeCycles: {
          prop: {
            stepName: '',
            duration: -1
          }
        }
      }],
      filterText: 100,
      search: ''
    }
  },

  methods: {

    /**
     *
     * @returns {Promise<any>}
     */
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

    /**
     *
     * @returns {{children: *[], name: string, actualDuration: number, id: number, parentId: number, isShow: boolean, tags: {}, beanLifeCycles: {prop: {duration: number, stepName: string}}}[]}
     */
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

    /**
     *
     * @param row
     * @param rowIndex
     * @returns {string}
     */
    tableRowClassName({row, rowIndex}) {
      if (row.actualDuration > 100) {
        return 'warning-row';
      } else if (rowIndex === 3) {
        return 'success-row';
      }
      return '';
    },

    /**
     * 自适应表格列宽
     * @param str
     * @param tableData
     * @param flag
     * @returns {string}
     */
    flexColumnWidth(str, tableData, flag = 'max') {
      // str为该列的字段名(传字符串);tableData为该表格的数据源(传变量);
      // flag为可选值，可不传该参数,传参时可选'max'或'equal',默认为'max'
      // flag为'max'则设置列宽适配该列中最长的内容,flag为'equal'则设置列宽适配该列中第一行内容的长度。
      str = str + ''
      let columnContent = ''
      if (!tableData || !tableData.length || tableData.length === 0) {
        return
      }
      if (!str || !str.length || str.length === 0) {
        return
      }
      if (flag === 'equal') {
        // 获取该列中第一个不为空的数据(内容)
        for (let i = 0; i < tableData.length; i++) {
          if (tableData[i][str].length > 0) {
            // console.log('该列数据[0]:', tableData[0][str])
            columnContent = tableData[i][str]
            break
          }
        }
      } else {
        // 获取该列中最长的数据(内容)
        let index = 0
        for (let i = 0; i < tableData.length; i++) {
          if (tableData[i][str] === null) {
            return
          }
          const now_temp = tableData[i][str] + ''
          const max_temp = tableData[index][str] + ''
          if (now_temp.length > max_temp.length) {
            index = i
          }
        }
        columnContent = tableData[index][str]
      }
      // console.log('该列数据[i]:', columnContent)
      // 以下分配的单位长度可根据实际需求进行调整
      let flexWidth = 0
      for (const char of columnContent) {
        //英文字符
        if ((char >= 'A' && char <= 'Z') || (char >= 'a' && char <= 'z')) {
          flexWidth += 8
          //中文字符
        } else if (char >= '\u4e00' && char <= '\u9fa5') {
          flexWidth += 10
        } else {
          flexWidth += 6
        }
      }
      if (flexWidth < 80) {
        flexWidth = 80
      }
      return flexWidth + 'px'
    }


  },


};
</script>

<style >
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

.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}

.bean-name {
  background: #f0f9eb;
  border: 1px dashed #000;
  margin-left: 10px;
  margin-right: 10px;
}

</style>
