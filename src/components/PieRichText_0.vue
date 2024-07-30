<template>
  <div id="container">SSS</div>
</template>

<script>
export default {
  name: 'HelloWorld',
  mounted() {
    this.getEchartsDate()
      .then((data) => {

        this.option.series[0].data[0] = data.initializedComponentDetailList;
        console.log(JSON.stringify(this.option.series[0].data[0]))
        this.drawChart();

      })
  },
  //methods
  methods: {
    async getEchartsDate() {

      const response = await fetch("http://127.0.0.1:9999/analysis/json", { method: "GET" })

      try {
        return await response.json()
      } catch (error) {

        console.error("An error occurred:", error.message);

      }

    },
    drawChart() {
      //初始化图表
      var echartsBI = this.$echarts.init(document.getElementById('container'));

      echartsBI.showLoading();

      //指定图表配置项和数据
      echartsBI.setOption(this.option);

      echartsBI.hideLoading();
    }
  },
  //data
  data() {
    return {
      option: {
        tooltip: {
          trigger: 'item',
          triggerOn: 'mousemove'
        },
        legend: {
          top: '2%',
          left: '3%',
          orient: 'vertical',
          data: [
            {
              name: 'Component组件耗时分析',
              icon: 'rectangle'
            }
          ],
          borderColor: '#c23531'
        },
        series: [
          {
            type: 'tree',
            name: 'Component组件耗时分析',
            data: [{"children":[{"children":[{"children":[],"name":"com.lcsc.profiling.web.api.ApiController$$EnhancerBySpringCGLIB$$3ac2f6ca-->com.lcsc.profiling.web.api.ApiController$$EnhancerBySpringCGLIB$$3ac2f6ca","value":30.065},{"children":[],"name":"Others","value":0}],"name":"AopProxyCreator","value":30.065},{"children":[{"children":[],"name":"application","value":1827.773},{"children":[],"name":"Others","value":1144.433}],"name":"Apollo","value":2972.206},{"children":[],"name":"Apollo","value":8.853},{"children":[],"name":"Swagger","value":253.702},{"children":[],"name":"Others","value":11918.831}],"name":"SpringApplication","value":15183.657}],
            top: '2%',
            left: '5%',
            bottom: '2%',
            right: '2%',
            symbolSize: 7,
            label: {
              position: 'left',
              verticalAlign: 'middle',
              align: 'right'
            },
            leaves: {
              label: {
                position: 'right',
                verticalAlign: 'middle',
                align: 'left'
              }
            },
            emphasis: {
              focus: 'descendant'
            },
            expandAndCollapse: true,
            animationDuration: 550,
            animationDurationUpdate: 750
          }
        ]
      }
    };
  }

}
</script>

<style scoped>
#container {
  height: 100%;
}
</style>
