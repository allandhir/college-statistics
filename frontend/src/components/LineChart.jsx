import { Spin } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { getAcademicHistory } from "../services";

function LineChart({ studentId }) {
  const [scores, setScores] = useState([]);

  const getStudentHistory = useCallback(async (id) => {
    const { data } = await getAcademicHistory(id);
    setScores(data[0].AcademicHistory);
  }, []);
  useEffect(() => {
    getStudentHistory(studentId);
    return () => {};
  }, [getStudentHistory, studentId]);
  let state = {
    options: {
      chart: {
        // height: 300,
        type: "line",
      },
      responsive: [
        {
          breakpoint: 1300,
          options: {
            // chart: {
            //   width: "100%",
            //   height: "100%",
            // },
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
      stroke: {
        width: 7,
        curve: "smooth",
      },
      xaxis: {
        type: "datetime",
        categories: [
          "3/11/2015",
          "6/11/2015",
          "9/11/2015",
          "11/11/2015",
          "12/11/2015",
          "3/11/2016",
          "6/11/2016",
          "9/11/2016",
          "11/11/2016",
          "12/11/2016",
          "3/11/2017",
          "6/11/2017",
          "9/11/2017",
          "11/11/2017",
          "12/11/2017",
          "3/11/2018",
          "6/11/2018",
          "9/11/2018",
        ],
        tickAmount: 7,
        labels: {
          formatter: function (value, timestamp, opts) {
            return opts.dateFormatter(new Date(timestamp), "MMM yyyy");
          },
        },
      },
      // title: {
      //   text: "Academic History",
      //   align: "left",
      //   style: {
      //     fontSize: "16px",
      //     color: "#666",
      //   },
      // },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          gradientToColors: ["#FDD835"],
          shadeIntensity: 1,
          type: "horizontal",
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100, 100, 100],
        },
      },
      markers: {
        size: 4,
        colors: ["#FFA41B"],
        strokeColors: "#fff",
        strokeWidth: 2,
        hover: {
          size: 7,
        },
      },
      yaxis: {
        min: 0,
        max: 100,
        title: {
          text: "Score",
        },
      },
    },
  };
  if (scores.length === 0)
    return (
      <div className="text-center">
        <Spin tip="loading..." size="large" />
      </div>
    );
  return (
    <ReactApexChart
      options={state.options}
      series={[
        {
          name: "Scores",
          data: scores,
        },
      ]}
      type="line"
      height="100%"
      width="100%"
    />
  );
}

export default LineChart;
