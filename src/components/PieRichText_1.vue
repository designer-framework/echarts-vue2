<template>
  <div id="container"></div>
</template>

<script>
export default {
  name: 'PieRichText',
  mounted() {
    this.drawChart();
  },
  //methods
  methods: {
    drawChart() {
      //2. 基于准备好的dom，初始化echarts实例
      //此处的意思就是，对 demo 元素 进行图表初始化的相关操作
      var echartsBI = this.$echarts.init(document.getElementById('container'));

      echartsBI.showLoading();

      //4.使用刚指定的配置项和数据显示图表。
      console.log(this.option)
      echartsBI.setOption(this.option);

      echartsBI.hideLoading();
    }
  },
  //data
  data() {
    return {
      option: {
        title: {
          text: 'Application Start Up Statistics',
          subtext: 'Fake Data',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          bottom: 10,
          left: 'center',
          data: ['Scanner', 'Swagger', 'Apollo']
        },
        series: [
          {
            type: 'pie',
            radius: '65%',
            center: ['50%', '50%'],
            selectedMode: 'single',
            data: [
              {
                value: 1548,
                name: 'Scanner',
                label: {
                  formatter: [
                    '{title|{b}}{abg|}',
                    '{headName|ShowName}{headDuration|Duration}{headRate|Percent}',
                    '{hr|}',
                    '{Line|com.lcsc.} {value|202}{rate|  55.3%}',
                    '{Line|com.lcsc.} {value|142}{rate|  38.9%}',
                    '{Line|com.lcsc.xczxcxcxcz} {value|121}{rate| 5.8%}'
                  ].join('\n'),
                  backgroundColor: '#eee',
                  borderColor: '#777',
                  borderWidth: 1,
                  borderRadius: 4,
                  rich: {
                    title: {
                      color: '#eee',
                      align: 'center'
                    },
                    abg: {
                      backgroundColor: '#333',
                      width: '100%',
                      align: 'right',
                      height: 25,
                      borderRadius: [4, 4, 0, 0]
                    },
                    headName: {
                      color: '#333',
                      height: 24,
                      align: 'left'
                    },
                    Line: {
                      height: 30,
                      align: 'left'
                    },
                    hr: {
                      borderColor: '#777',
                      width: '100%',
                      borderWidth: 0.5,
                      height: 0
                    },
                    value: {
                      width: 20,
                      padding: [0, 20, 0, 30],
                      align: 'right'
                    },
                    headDuration: {
                      color: '#333',
                      width: 40,
                      padding: [0, 20, 0, 30],
                      align: 'right'
                    },
                    rate: {
                      width: 40,
                      align: 'right',
                      padding: [0, 10, 0, 0]
                    },
                    headRate: {
                      color: '#333',
                      width: 40,
                      align: 'right',
                      padding: [0, 10, 0, 0]
                    }
                  }
                }
              },
              { value: 735, name: 'Swagger' },
              { value: 434, name: 'Apollo' }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
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
