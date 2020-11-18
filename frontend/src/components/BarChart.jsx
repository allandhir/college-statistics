import { Spin } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import {
  cityCourseCount,
  countryCourseCount,
  stateCourseCount,
} from "../services";

function BarChart({ country, state, city, location, selectedValue }) {
  const [courseChartData, setCourseChartData] = useState({});
  const options = {
    chart: {
      type: "bar",

      events: {
        dataPointSelection: (event, chartContext, config) => {
          console.log(courseChartData.chartLabels[config.dataPointIndex]);
          if (selectedValue)
            selectedValue(courseChartData.chartLabels[config.dataPointIndex]);
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val;
      },
      //   offsetY: -20,
      style: {
        fontSize: "12px",
        colors: ["#000000"],
      },
    },
    // colors: colors,
    plotOptions: {
      bar: {
        columnWidth: "35%",
        distributed: true,
        dataLabels: {
          position: "top",
        },
      },
    },

    legend: {
      show: false,
    },
    xaxis: {
      categories: courseChartData.chartLabels,
      position: "bottom",
      labels: {
        style: {
          fontSize: "9px",
        },
      },
    },
  };

  const getCourseCount = useCallback(async () => {
    // setCityLoading(true);
    const { data } =
      location === "country"
        ? await countryCourseCount(country)
        : location === "state"
        ? await stateCourseCount(country, state)
        : await cityCourseCount(country, state, city);
    console.log("STATE COURSES", data, country, state);

    let courseNames = [];
    let courseCount = [];
    data.forEach((ele) => {
      const {
        _id: { Course },
        count,
        // averageRating,
      } = ele;
      courseNames.push(Course);
      courseCount.push(count);
    });
    setCourseChartData({
      chartLabels: courseNames,
      chartSeries: courseCount,
    });
    // setCityLoading(false);
  }, [country, state, location, city]);

  useEffect(() => {
    getCourseCount();
    return () => {};
  }, [getCourseCount]);
  if (Object.keys(courseChartData).length === 0)
    return (
      <div className="text-center">
        <Spin tip="loading..." size="large" />
      </div>
    );
  return (
    <ReactApexChart
      options={options}
      series={[
        {
          name: "Colleges",
          data: courseChartData.chartSeries,
        },
      ]}
      type="bar"
      height="100%"
    />
  );
}

export default BarChart;
