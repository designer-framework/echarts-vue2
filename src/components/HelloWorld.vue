<template>
  <div id="demo"></div>
</template>

<script>
export default {
  name: 'HelloWorld',
  mounted() {
    //进入页面就执行一次
    this.drawChart();
  },
  methods: {
    drawChart() {
      //2. 基于准备好的dom，初始化echarts实例
      //此处的意思就是，对 demo 元素 进行图表初始化的相关操作
      var echartsBI = this.$echarts.init(document.getElementById('demo'));

      echartsBI.showLoading();

      //3. 指定图表的配置项和数据
      //该处就是图表内容，在官网的示例里面，要复制过来到项目里面的也是这一块内容
      var option = {
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
            data: [this.data],
            top: '5%',
            left: '17%',
            bottom: '2%',
            right: '60%',
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
      };

      //4.使用刚指定的配置项和数据显示图表。
      echartsBI.setOption(option);

      echartsBI.hideLoading();
    }
  },
  data() {
    return {
      data: {
        name: 'Application',
        children: [
          {
            name: 'Apollo',
            children: [
              {
                name: 'com.ctrip.framework.apollo.spring.boot.ApolloApplicationContextInitializer#initialize(org.springframework.core.env.ConfigurableEnvironment)',
                children: [
                  { name: 'Converters', value: 721 },
                  { name: 'DelimitedTextConverter', value: 4294 }
                ]
              },
              {
                name: 'DataUtil',
                value: 3322
              }
            ]
          },
          {
            name: 'Feign',
            children: [
              { name: 'DirtySprite', value: 8833 },
              { name: 'LineSprite', value: 1732 },
              { name: 'RectSprite', value: 3623 }
            ]
          },
          {
            name: 'PackageScanner',
            children: [
              { name: 'DirtySprite', value: 8833 },
              { name: 'LineSprite', value: 1732 },
              { name: 'RectSprite', value: 3623 }
            ]
          },
          {
            name: 'Swagger',
            children: [{ name: 'FlareVis', value: 4116 }]
          },
          {
            name: 'Aop',
            children: [{ name: 'FlareVis', value: 4116 }]
          }
        ]
      }
    };
  }

}
</script>

<style scoped>
#demo {
  padding: auto;
  width: 1000px;
  height: 1000px;
  align-content: center;
}
</style>
