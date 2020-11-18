import Properties from "../properties";
import CollegeModel from "../models/CollegeModel";
import ErrorManager from "../classes/ErrorManager";
const collegeController = {
  /**
   * Init routes
   */
  init: (router) => {
    const baseUrl = `${Properties.api}/college`;
    router.delete(baseUrl + "/:id", collegeController.delete);
    router.get(baseUrl + "", collegeController.list);
    router.get(baseUrl + "/:id", collegeController.get);
    router.post(baseUrl + "", collegeController.create);
    router.post(baseUrl + "/students", collegeController.getCollegeStudents);
    router.get(baseUrl + "/country/count", collegeController.getCountByCountry);
    router.post(
      baseUrl + "/country/state/count",
      collegeController.getCountByState
    );
    router.post(
      baseUrl + "/country/city/count",
      collegeController.getCountByCity
    );
    router.post(
      baseUrl + "/country/state/list",
      collegeController.getCollegesByState
    );
    router.post(
      baseUrl + "/country/state/city/list",
      collegeController.getCollegesByCity
    );
    router.post(
      baseUrl + "/country/list",
      collegeController.getCollegesByCountry
    );
    router.post(
      baseUrl + "/country/state/courses/count",
      collegeController.getCoursesByState
    );
    router.post(
      baseUrl + "/country/courses/count",
      collegeController.getCoursesByCountry
    );
    router.post(
      baseUrl + "/country/state/city/courses/count",
      collegeController.getCoursesByCity
    );
    router.post(
      baseUrl + "/country/state/course/list",
      collegeController.getStateCollegesByCourse
    );
    router.post(
      baseUrl + "/country/state/city/course/list",
      collegeController.getCityCollegesByCourse
    );
    router.post(
      baseUrl + "/country/course/list",
      collegeController.getCountryCollegesByCourse
    );
  },

  // CRUD METHODS
  /**
   * CollegeModel.get
   *   @description CRUD ACTION get
   *   @param ObjectId id Id resource
   *
   */
  get: async (req, res) => {
    try {
      const result = await CollegeModel.get(req.params.id);
      res.json(result);
    } catch (err) {
      const safeErr = ErrorManager.getSafeError(err);
      res.status(safeErr.status).json(safeErr);
    }
  },
  /**
   * CollegeModel.create
   *   @description CRUD ACTION create
   *
   */
  create: async (req, res) => {
    try {
      const result = await CollegeModel.create(req.body);
      res.json(result);
    } catch (err) {
      const safeErr = ErrorManager.getSafeError(err);
      res.status(safeErr.status).json(safeErr);
    }
  },

  /**
   * CollegeModel.delete
   *   @description CRUD ACTION delete
   *   @param ObjectId id Id
   *
   */
  delete: async (req, res) => {
    try {
      const result = await CollegeModel.delete(req.params.id);
      res.json(result);
    } catch (err) {
      const safeErr = ErrorManager.getSafeError(err);
      res.status(safeErr.status).json(safeErr);
    }
  },

  /**
   * CollegeModel.list
   *   @description CRUD ACTION list
   *
   */
  list: async (req, res) => {
    try {
      const result = await CollegeModel.list();
      res.json(result);
    } catch (err) {
      const safeErr = ErrorManager.getSafeError(err);
      res.status(safeErr.status).json(safeErr);
    }
  },

  // Custom APIs

  /**
   * CollegeModel.getStudents
   *   @description Returns all the students of a college
   *   @param _id CollegeId
   *   @returns ARRAY of student objects
   *
   */
  getCollegeStudents: async (req, res) => {
    try {
      const result = await CollegeModel.listCollegeStudents(req.body.collegeId);
      res.json(result);
    } catch (err) {
      const safeErr = ErrorManager.getSafeError(err);
      res.status(safeErr.status).json(safeErr);
    }
  },
  /**
   *
   */
  getCountByCountry: async (req, res) => {
    try {
      const countBycountry = await CollegeModel.countCollegesByCountry();
      res.json(countBycountry);
    } catch (err) {
      const safeErr = ErrorManager.getSafeError(err);
      res.status(safeErr.status).json(safeErr);
    }
  },
  /**
   *
   */
  getCountByState: async (req, res) => {
    try {
      const countByState = await CollegeModel.countCollegesByState(
        req.body.country
      );
      res.json(countByState);
    } catch (err) {
      const safeErr = ErrorManager.getSafeError(err);
      res.status(safeErr.status).json(safeErr);
    }
  },
  /**
   *
   */
  getCountByCity: async (req, res) => {
    try {
      const { Country, State, City } = req.body;
      const countBycity = await CollegeModel.countCollegesByCity(
        Country,
        State
      );
      res.json(countBycity);
    } catch (err) {
      const safeErr = ErrorManager.getSafeError(err);
      res.status(safeErr.status).json(safeErr);
    }
  },
  /**
   *
   */
  getCollegesByCity: async (req, res) => {
    try {
      // console.log("COUNTRY", req.body.Country);
      const { Country, State, City } = req.body;
      const listByCity = await CollegeModel.listCollegesByCity(
        Country,
        State,
        City
      );
      res.json(listByCity);
    } catch (err) {
      const safeErr = ErrorManager.getSafeError(err);
      res.status(safeErr.status).json(safeErr);
    }
  },
  /**
   *
   */
  getCollegesByCountry: async (req, res) => {
    try {
      // console.log("COUNTRY", req.body.Country);
      const { Country } = req.body;
      const listByCountry = await CollegeModel.listCollegesByCountry(Country);
      res.json(listByCountry);
    } catch (err) {
      const safeErr = ErrorManager.getSafeError(err);
      res.status(safeErr.status).json(safeErr);
    }
  },
  /**
   *
   */
  getStateCollegesByCourse: async (req, res) => {
    try {
      const { Country, State, Course } = req.body;
      const listByCourse = await CollegeModel.listStateCollegesByCourse(
        Country,
        State,
        Course
      );
      res.json(listByCourse);
    } catch (err) {
      const safeErr = ErrorManager.getSafeError(err);
      res.status(safeErr.status).json(safeErr);
    }
  },
  /**
   *
   */
  getCountryCollegesByCourse: async (req, res) => {
    try {
      const { Country, Course } = req.body;
      const listByCourse = await CollegeModel.listCountryCollegesByCourse(
        Country,
        Course
      );
      res.json(listByCourse);
    } catch (err) {
      const safeErr = ErrorManager.getSafeError(err);
      res.status(safeErr.status).json(safeErr);
    }
  },
  /**
   *
   */
  getCityCollegesByCourse: async (req, res) => {
    try {
      const { Country, State, City, Course } = req.body;
      const listByCourse = await CollegeModel.listCityCollegesByCourse(
        Country,
        State,
        City,
        Course
      );
      res.json(listByCourse);
    } catch (err) {
      const safeErr = ErrorManager.getSafeError(err);
      res.status(safeErr.status).json(safeErr);
    }
  },
  /**
   *
   */
  getCoursesByState: async (req, res) => {
    try {
      // console.log("COUNTRY", req.body.Country);
      const { Country, State } = req.body;
      const coursesByState = await CollegeModel.countCoursesByState(
        Country,
        State
      );
      res.json(coursesByState);
    } catch (err) {
      const safeErr = ErrorManager.getSafeError(err);
      res.status(safeErr.status).json(safeErr);
    }
  },
  /**
   *
   */
  getCoursesByCity: async (req, res) => {
    try {
      const { Country, State, City } = req.body;
      const coursesByCity = await CollegeModel.countCoursesByCity(
        Country,
        State,
        City
      );
      res.json(coursesByCity);
    } catch (err) {
      const safeErr = ErrorManager.getSafeError(err);
      res.status(safeErr.status).json(safeErr);
    }
  },
  /**
   *
   */
  getCoursesByCountry: async (req, res) => {
    try {
      // console.log("COUNTRY", req.body.Country);
      const { Country } = req.body;
      const coursesByCountry = await CollegeModel.countCoursesByCountry(
        Country
      );
      res.json(coursesByCountry);
    } catch (err) {
      const safeErr = ErrorManager.getSafeError(err);
      res.status(safeErr.status).json(safeErr);
    }
  },
  /**
   *
   */
  getCollegesByState: async (req, res) => {
    try {
      const { Country, State } = req.body;
      const listByState = await CollegeModel.listCollegesByState(
        Country,
        State
      );
      res.json(listByState);
    } catch (err) {
      const safeErr = ErrorManager.getSafeError(err);
      res.status(safeErr.status).json(safeErr);
    }
  },
};

export default collegeController;
