import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URI;
const http = axios.create({ baseURL: process.env.REACT_APP_BACKEND_URI });

/**
 * College Count
 */
export const countryCollegeCount = () => {
  return http.get("/api/college/country/count");
};
export const stateCollegeCount = (country) => {
  return http.post("/api/college/country/state/count", { country });
};
export const cityCollegeCount = (Country, State) => {
  return http.post("/api/college/country/city/count", { Country, State });
};

/**
 * Course Count By location
 */
export const countryCourseCount = (Country, State) => {
  return http.post("/api/college/country/courses/count", {
    Country,
    State,
  });
};
export const stateCourseCount = (Country, State) => {
  return http.post("/api/college/country/state/courses/count", {
    Country,
    State,
  });
};
export const cityCourseCount = (Country, State, City) => {
  return http.post("/api/college/country/state/city/courses/count", {
    Country,
    State,
    City,
  });
};

/**
 * College List By Course
 */
export const listCountryCollegesByCourse = (Country, Course) => {
  return http.post("/api/college/country/course/list", {
    Country,
    Course,
  });
};
export const listStateCollegesByCourse = (Country, State, Course) => {
  return http.post("/api/college/country/state/course/list", {
    Country,
    State,
    Course,
  });
};
export const listCityCollegesByCourse = (Country, State, City, Course) => {
  return http.post("/api/college/country/state/city/course/list", {
    Country,
    State,
    City,
    Course,
  });
};
/**
 * Student Details
 */
export const listStudents = (collegeId) => {
  return http.post("/api/college/students", { collegeId });
};
export const getAcademicHistory = (studentId) => {
  return http.post("/api/student/history", { studentId });
};
/**
 * College List
 */
export const collegeListByCountry = (Country) => {
  return http.post("/api/college/country/list", {
    Country,
  });
};
export const collegeListByState = (Country, State) => {
  return http.post("/api/college/country/state/list", {
    Country,
    State,
  });
};
export const collegeListByCity = (Country, State, City) => {
  return http.post("/api/college/country/state/city/list", {
    Country,
    State,
    City,
  });
};
export const listAllColleges = () => {
  return http.get("/api/college");
};
