<template>
  <div id="container"></div>
</template>

<script>
export default {
  name: "PieRichText",
  mounted() {
    this.drawChart();
  },
  //methods
  methods: {
    drawChart() {
      //初始化echarts实例
      var echartsBI = this.$echarts.init(document.getElementById("container"));

      echartsBI.showLoading();

      this.loadOption().then((data) => {
        let components = data.componentsMetric.children;

        let ser = components.map((childComponent) => {
          return this.getSeriesItem(childComponent);
        });

        //各组件
        let newOption = {
          legend: {
            bottom: 10,
            left: "center",
            //legend
            data: components.map((child) => {
              return child.name;
            }),
          },
          //data
          series: [
            {
              type: "pie",
              radius: "65%",
              center: ["50%", "50%"],
              selectedMode: "single",
              data: ser,
            },
          ],
        };

        Object.assign(this.option, newOption);

        //加载配置项和图表数据
        echartsBI.setOption(this.option);
        echartsBI.hideLoading();
      });
    },
    async loadOption() {
      const response = await fetch("http://127.0.0.1:9999/analysis/json", {
        method: "GET",
      });
      try {
        return await response.json();
      } catch (error) {
        console.error("An error occurred:", error.message);
      }
    },
    getSeriesItem(childComponent) {
      if (childComponent.children.length == 0) {
        return {
          name: childComponent.name,
          value: childComponent.value,
          desc: childComponent.desc
        };
      }
      let items = childComponent.children.map((componentItem) => {
        return (
          "{Line|" + componentItem.name + "}{value|" + componentItem.value + "/ms}{rate|" + componentItem.percent + "}"
        );
      });

      return {
        name: childComponent.name,
        value: childComponent.value,
        desc: childComponent.desc,
        label: {
          formatter: [
            "{title|{b}}{abg|}",
            "  {nameHead|ItemName}{valueHead|Duration}{rateHead|Percent}",
            "{hr|}",
            ...items,
          ].join("\n"),
          backgroundColor: "#eee",
          borderColor: "#777",
          borderWidth: 1,
          borderRadius: 4,
          rich: {
            title: {
              color: "#eee",
              align: "center",
            },
            abg: {
              backgroundColor: "#333",
              width: "100%",
              align: "right",
              height: 25,
              borderRadius: [4, 4, 0, 0],
            },
            Line: {
              height: 30,
              align: "left",
            },
            nameHead: {
              color: "#333",
              height: 24,
              align: "left",
            },
            hr: {
              borderColor: "#777",
              width: "100%",
              borderWidth: 0.5,
              height: 0,
            },
            value: {
              width: 20,
              padding: [0, 20, 0, 30],
              align: "right",
            },
            valueHead: {
              color: "#333",
              width: 20,
              padding: [0, 20, 0, 30],
              align: "right",
            },
            rate: {
              width: 40,
              align: "right",
              padding: [0, 10, 0, 0],
            },
            rateHead: {
              color: "#333",
              width: 40,
              align: "right",
              padding: [0, 10, 0, 0],
            },
          },
        },
      };
    },
  },
  //data
  data() {
    return {
      option: {
        title: {
          text: "Application Start Up Statistics",
          subtext: "Fake Data",
          left: "center",
        },
        tooltip: {
          trigger: "item",
          //formatter: "{a} <br/>{b} : {c} ({d}%)",
          formatter: function (item, ticket, callback) {
            callback(ticket, 'toHTML(content)');
            console.log(item.data)
            return item.marker + ' ' + item.name + ': ' + item.value + ' (' + item.percent + '%)<br>' + (item.data.desc ? item.data.desc : '');
          }
        },
        legend: {
          bottom: 10,
          left: "center",
          data: [],
        },
        series: [
          {
            type: "pie",
            radius: "65%",
            center: ["50%", "50%"],
            selectedMode: "single",
            data: [],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      },
    };
  },
};
</script>

<style scoped>
#container {
  height: 100%;
}
</style>
