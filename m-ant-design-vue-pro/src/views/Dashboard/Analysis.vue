<template>
  <div>
    {{ $t("message")["app.dashboard.analysis.timeLabel"] }} :
    <a-date-picker></a-date-picker>
    <Chart :option="chartOption" />
  </div>
</template>

<script>
import Chart from "@/components/Chart.vue";
import axios from "axios";
import request from "@/utils/request";
// import random from "lodash/random";
export default {
  data() {
    return {
      chartOption: {},
    };
  },
  mounted() {
    this.getChartData();
    this.interval = setInterval(() => {
      // this.chartOption.series[0].data = this.chartOption.series[0].data.map(
      //   () => random(100)
      // );
      this.getChartData();
      this.chartOption = { ...this.chartOption };
    }, 3000);
  },
  methods: {
    getChartData() {
      request({
        url: "/api/dashboard/chart",
        method: "get",
        params: { ID: 12345 },
      });
      axios
        .get("/api/dashboard/chart", {
          params: {
            ID: 12345,
          },
        })
        .then((response) => {
          this.chartOption = {
            title: {
              text: "ECharts 入门示例",
            },
            tooltip: {},
            legend: {
              data: ["销量"],
            },
            xAxis: {
              data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
            },
            yAxis: {},
            series: [
              {
                name: "销量",
                type: "bar",
                data: response.data,
              },
            ],
          };
        });
    },
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
  components: {
    Chart,
  },
};
</script>

<style></style>
