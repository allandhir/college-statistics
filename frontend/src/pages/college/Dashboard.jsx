import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  cityCollegeCount,
  countryCollegeCount,
  stateCollegeCount,
} from "../../services";
import { Divider, Spin } from "antd";
import { Button, Col, Row } from "reactstrap";
import DonutChart from "../../components/DonutChart";
import WhiteCard from "../../components/WhiteCard";
import { notification } from "antd";
import MyTable from "./MyTable";
import BarChart from "../../components/BarChart";
import { BackTop } from "antd";
function Country() {
  //college donut chart data
  const [countryChartData, setCountryChartData] = useState({});
  const [stateChartData, setStateChartData] = useState({});
  const [cityChartData, setCityChartData] = useState({});

  //courses bar chart data
  const [showStateCourseChart, setShowStateCourseChart] = useState(false);
  const [showCountryCourseChart, setShowCountryCourseChart] = useState(false);
  const [showCityCourseChart, setShowCityCourseChart] = useState(false);

  //chart loading
  const [countryLoading, setCountryLoading] = useState(true);
  const [stateLoading, setStateLoading] = useState(true);
  const [cityLoading, setCityLoading] = useState(true);

  //college table ref (for scroll into view)
  const collegeTableRef = useRef(null);

  //selected course from bar chart
  const [selectedCourse, setSelectedCourse] = useState({
    course: "Select Course",
    location: "",
  });

  //college location
  const [collegeLocation, setCollegeLocation] = useState({
    country: "Select Country",
    state: "Select State",
    city: "Select City",
  });

  //scroll into view
  const executeScroll = (myRef) =>
    myRef.current.scrollIntoView({ behaviour: "smooth" });

  /**
   * Notifications
   */

  //country-notif
  const selectCountryNotif = (type) => {
    notification[type]({
      message: "Country",
      description: "Select a Country",
      duration: 120,
      key: "country-notif",
    });
  };
  //state-notif
  const selectStateNotif = (type) => {
    notification[type]({
      message: "State",
      description: "Select a State",
      duration: 120,
      key: "state-notif",
    });
  };
  //city-notif
  const selectCityNotif = (type) => {
    notification[type]({
      message: "City",
      description: "Select a City",
      duration: 120,
      key: "city-notif",
    });
  };

  /**
   * get college count
   */

  //count by country

  const getByCountry = useCallback(async () => {
    setCountryLoading(true);
    const { data } = await countryCollegeCount(() => {});
    console.log("COUNTRY", data);
    let countryNames = [];
    let collegeCount = [];
    data.forEach((country) => {
      const {
        _id,
        count,
        // averageRating
      } = country;
      countryNames.push(_id);
      collegeCount.push(count);
    });
    setCountryChartData({
      chartLabels: countryNames,
      chartSeries: collegeCount,
    });
    setCountryLoading(false);
    selectCountryNotif("info");
  }, []);

  //count by state
  const getByState = useCallback(async () => {
    setStateLoading(true);
    const { data } = await stateCollegeCount(collegeLocation.country);
    console.log("STATE", data);
    let stateNames = [];
    let collegeCount = [];
    data.forEach((ele) => {
      const {
        _id: { state },
        count,
        // averageRating,
      } = ele;
      stateNames.push(state);
      collegeCount.push(count);
    });
    setStateChartData({ chartLabels: stateNames, chartSeries: collegeCount });
    setStateLoading(false);
  }, [collegeLocation.country]);

  //count by city
  const getByCity = useCallback(async () => {
    setCityLoading(true);
    const { data } = await cityCollegeCount(
      collegeLocation.country,
      collegeLocation.state
    );
    console.log("CITY", data);

    let cityNames = [];
    let collegeCount = [];
    data.forEach((ele) => {
      const {
        _id: { city },
        count,
        // averageRating,
      } = ele;
      cityNames.push(city);
      collegeCount.push(count);
    });
    setCityChartData({ chartLabels: cityNames, chartSeries: collegeCount });
    setCityLoading(false);
  }, [collegeLocation.country, collegeLocation.state]);

  useEffect(() => {
    getByCountry();
    return () => {};
  }, [getByCountry]);

  useEffect(() => {
    getByState();
    return () => {};
  }, [getByState, collegeLocation.country]);

  useEffect(() => {
    getByCity();
    return () => {};
  }, [getByCity, collegeLocation.state]);

  return (
    <div>
      <Row className="justify-content-md-center pb-1">
        <Col md={12} lg={4}>
          <WhiteCard
            title={collegeLocation.country}
            height="320px"
            showToggle={true}
            setCourseChart={(isChecked) => setShowCountryCourseChart(isChecked)}
          >
            {countryLoading ? (
              <div className="text-center">
                <Spin tip="loading..." size="large" />
              </div>
            ) : showCountryCourseChart ? (
              <BarChart
                country={collegeLocation.country}
                state={collegeLocation.state}
                location="country"
                selectedValue={(val) => {
                  setSelectedCourse({ course: val, location: "country" });
                  executeScroll(collegeTableRef);
                }}
              />
            ) : (
              <DonutChart
                chartLabels={countryChartData.chartLabels}
                chartSeries={countryChartData.chartSeries}
                selectedValue={(value) => {
                  setCollegeLocation({
                    ...collegeLocation,
                    country: value,
                    state: "Select State",
                    city: "Select City",
                  });
                  notification.close("country-notif");
                  selectStateNotif("info");
                }}
                id="country-count"
              />
            )}
          </WhiteCard>
        </Col>
        <Col md={12} lg={4}>
          <WhiteCard
            title={collegeLocation.state}
            height="320px"
            showToggle={true}
            setCourseChart={(isChecked) => setShowStateCourseChart(isChecked)}
          >
            {stateLoading ? (
              <div className="text-center">
                <Spin tip="loading..." size="large" />
              </div>
            ) : showStateCourseChart ? (
              <BarChart
                country={collegeLocation.country}
                state={collegeLocation.state}
                location="state"
                selectedValue={(val) => {
                  setSelectedCourse({ course: val, location: "state" });
                  executeScroll(collegeTableRef);
                }}
              />
            ) : (
              <DonutChart
                chartLabels={stateChartData.chartLabels}
                chartSeries={stateChartData.chartSeries}
                selectedValue={(value) => {
                  setCollegeLocation({
                    ...collegeLocation,
                    state: value,
                    city: "Select City",
                  });
                  notification.close("state-notif");
                  selectCityNotif("info");
                }}
                id="state-count"
              />
            )}
          </WhiteCard>
        </Col>
        <Col md={12} lg={4}>
          <WhiteCard
            title={collegeLocation.city}
            height="320px"
            showToggle={true}
            setCourseChart={(isChecked) => setShowCityCourseChart(isChecked)}
          >
            {cityLoading ? (
              <div className="text-center">
                <Spin tip="loading..." size="large" />
              </div>
            ) : showCityCourseChart ? (
              <BarChart
                country={collegeLocation.country}
                state={collegeLocation.state}
                city={collegeLocation.city}
                location="city"
                selectedValue={(val) => {
                  setSelectedCourse({ course: val, location: "city" });
                  executeScroll(collegeTableRef);
                }}
              />
            ) : (
              <DonutChart
                chartLabels={cityChartData.chartLabels}
                chartSeries={cityChartData.chartSeries}
                selectedValue={(value) => {
                  setCollegeLocation({ ...collegeLocation, city: value });
                  notification.close("city-notif");
                }}
                id="city-count"
              />
            )}
          </WhiteCard>
        </Col>
      </Row>
      <Divider />

      <MyTable
        country={collegeLocation.country}
        state={collegeLocation.state}
        city={collegeLocation.city}
        course={selectedCourse}
        collegeTableRef={collegeTableRef}
      />
      <BackTop>
        <Button color="secondary" size="md">
          Top
        </Button>
      </BackTop>
    </div>
  );
}

export default Country;
