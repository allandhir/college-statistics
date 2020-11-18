import React, { useEffect } from "react";
import ReactApexChart from "react-apexcharts";

function DonutChart(props) {
  const { chartLabels, chartSeries, selectedValue } = props;
  const options = {
    labels: chartLabels,
    dataLabels: {
      enabled: true,
      formatter: function (val, opts) {
        return Math.round((val + Number.EPSILON) * 10) / 10 + "%";
      },
    },
    theme: {
      monochrome: {
        enabled: false,
      },
    },
    responsive: [
      {
        breakpoint: 1300,
        options: {
          chart: {
            width: "100%",
            height: "100%",
          },
          legend: {
            position: "bottom",
            show: true,
          },
        },
      },
      {
        breakpoint: 480,
        options: {
          chart: {
            width: "100%",
            height: "100%",
          },
          legend: {
            position: "bottom",
            show: true,
          },
        },
      },
    ],
    // title: {
    //   text: "Colleges By Country",
    //   align: "left",
    // },
    legend: {
      show: true,
      formatter: function (seriesName, opts) {
        return [opts.w.globals.series[opts.seriesIndex], " - ", seriesName];
      },
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: function (y) {
          if (typeof y !== "undefined") {
            return y.toFixed(0) + " colleges";
          }
          return y;
        },
      },
    },
    chart: {
      id: props.id,
      // width: 400,
      type: "donut",
      noData: {
        text: "No Data Available",
        align: "center",
        verticalAlign: "middle",
        offsetX: 0,
        offsetY: 0,
        style: {
          color: undefined,
          fontSize: "14px",
          fontFamily: undefined,
        },
      },
      events: {
        dataPointSelection: (event, chartContext, config) => {
          console.log(config.w.config.labels[config.dataPointIndex]);
          if (selectedValue)
            selectedValue(config.w.config.labels[config.dataPointIndex]);
        },
      },
    },
    methods: {
      // updateWidth() {
      //   console.log(
      //     document.getElementsByClassName("whitecard")[0].offsetWidth
      //   );
      //   let w = document.getElementsByClassName("whitecard")[0];
      //   if (w.offsetWidth > 250) w.style.width = "200px";
      //   else w.style.width = "300px";
      // },
    },
  };

  useEffect(() => {
    console.log("rendered donut");
    return () => {};
  }, [chartLabels, selectedValue, props.id]);
  return (
    <ReactApexChart
      options={options}
      series={chartSeries}
      type="donut"
      height="100%"
      width="100%"
    />
  );
}

export default DonutChart;
