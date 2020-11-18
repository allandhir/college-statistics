import Properties from "../properties";
import StudentModel from "../models/StudentModel";
import ErrorManager from "../classes/ErrorManager";
const studentController = {
  /**
   * Init routes
   */
  init: (router) => {
    const baseUrl = `${Properties.api}/student`;
    router.delete(baseUrl + "/:id", studentController.delete);
    router.get(baseUrl + "", studentController.list);
    router.get(baseUrl + "/:id", studentController.get);
    router.post(baseUrl + "", studentController.create);
    router.post(baseUrl + "/college", studentController.getCollege);
    router.post(baseUrl + "/history", studentController.getAcademicHistory);
  },

  // CRUD METHODS
  /**
   * StudentModel.get
   *   @description CRUD ACTION get
   *   @param ObjectId id Id resource
   *
   */
  get: async (req, res) => {
    try {
      const result = await StudentModel.get(req.params.id);
      res.json(result);
    } catch (err) {
      const safeErr = ErrorManager.getSafeError(err);
      res.status(safeErr.status).json(safeErr);
    }
  },
  /**
   * StudentModel.create
   *   @description CRUD ACTION create
   *
   */
  create: async (req, res) => {
    try {
      const collegeId = await studentController.findCollegeIdByName(
        req.body.CollegeName
      );
      req.body.College = collegeId;
      console.log("student body", req.body);

      const result = await StudentModel.create(req.body);
      res.json(result);
    } catch (err) {
      const safeErr = ErrorManager.getSafeError(err);
      res.status(safeErr.status).json(safeErr);
    }
  },

  /**
   * StudentModel.delete
   *   @description CRUD ACTION delete
   *   @param ObjectId id Id
   *
   */
  delete: async (req, res) => {
    try {
      const result = await StudentModel.delete(req.params.id);
      res.json(result);
    } catch (err) {
      const safeErr = ErrorManager.getSafeError(err);
      res.status(safeErr.status).json(safeErr);
    }
  },

  /**
   * StudentModel.list
   *   @description CRUD ACTION list
   *
   */
  list: async (req, res) => {
    try {
      const result = await StudentModel.list();
      res.json(result);
    } catch (err) {
      const safeErr = ErrorManager.getSafeError(err);
      res.status(safeErr.status).json(safeErr);
    }
  },
  // Custom APIs
  /**
   * StudentModel.getClasses
   *   @description Get all the classes of a particular student
   *   @param studentId ID StudentId
   *   @returns ARRAY of ClassRoom Objects
   *
   */
  getCollege: async (req, res) => {
    try {
      const result = await StudentModel.listCollege(req.body.studentId);
      res.json(result);
    } catch (err) {
      const safeErr = ErrorManager.getSafeError(err);
      res.status(safeErr.status).json(safeErr);
    }
  },

  getAcademicHistory: async (req, res) => {
    try {
      const result = await StudentModel.listAcademicHistory(req.body.studentId);
      res.json(result);
    } catch (err) {
      const safeErr = ErrorManager.getSafeError(err);
      res.status(safeErr.status).json(safeErr);
    }
  },
};

export default studentController;
