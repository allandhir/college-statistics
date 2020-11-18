// Database
import Database from "../classes/Database";
import mongoose, { Schema } from "mongoose";

import Logger from "../classes/Logger";

const CollegeModel = {
  /**
   * Init  schema
   */
  init() {
    const db = Database.getConnection();

    /**
     * College
     */
    const collegeSchema = new mongoose.Schema({
      Name: {
        type: String,
      },
      Year: {
        type: String,
      },
      Country: {
        type: String,
      },
      City: {
        type: String,
      },
      State: {
        type: String,
      },
      Courses: {
        type: [{ type: String }],
      },
      Rating: {
        type: Number,
      },
      Students: [{ type: Schema.Types.ObjectId, ref: "Student" }],
    });

    CollegeModel.setModel(db.connection.model("College", collegeSchema));

    return collegeSchema;
  },

  /**
   * Set Model
   */
  setModel: (model) => {
    CollegeModel.model = model;
  },

  /**
   * Get model
   */
  getModel: () => {
    return CollegeModel.model;
  },

  // Start queries

  // CRUD METHODS
  /**
   * CollegeModels.create
   *   @description CRUD ACTION create
   *
   */
  async create(item) {
    const obj = new CollegeModel.model(item);
    return await obj.save();
  },
  /**
   * CollegeModels.delete
   *   @description CRUD ACTION delete
   *   @param ObjectId id Id
   *
   */
  async delete(id) {
    return await CollegeModel.model.findByIdAndRemove(id);
  },
  /**
   * CollegeModel.get
   *   @description CRUD ACTION get
   *   @param ObjectId id Id resource
   *
   */
  async get(id) {
    return await CollegeModel.model.findOne({ _id: id });
  },

  /**
   * CollegeModels.list
   *   @description Gets all colleges
   *   @returns ARRAY OF Colleges
   *
   */
  async list() {
    return await CollegeModel.model.aggregate([{ $project: { Students: 0 } }]);
  },
  // Start custom queries
  /**
   * CollegeModel.listCollegeStudents
   *   @description Gets all students of a college
   *   @param _id college ID
   *   @returns ARRAY OF Students
   *
   */
  listCollegeStudents: async (_id) => {
    return await CollegeModel.model
      .findOne({ _id })
      .populate("Students", { AcademicHistory: 0 })
      .select("Students");
  },

  /**
   * CollegeModel.countCollegesByCountry
   *   @description Gets count of colleges by country
   *   @param none
   *   @returns object
   */
  countCollegesByCountry: async () => {
    return await CollegeModel.model.aggregate([
      {
        $group: {
          _id: "$Country",
          count: { $sum: 1 },
          averageRating: { $avg: "$Rating" },
        },
      },
    ]);
  },
  /**
   * CollegeModel.countCollegesByState
   *   @description Gets count of colleges by state
   *   @param country country
   *   @returns object
   */
  countCollegesByState: async (country) => {
    return await CollegeModel.model.aggregate([
      { $match: { Country: country } },
      {
        $group: {
          _id: {
            state: "$State",
          },
          count: { $sum: 1 },
          averageRating: { $avg: "$Rating" },
        },
      },
    ]);
  },
  /**
   * CollegeModel.countCollegesByCity
   */
  countCollegesByCity: async (country, state, city) => {
    return await CollegeModel.model.aggregate([
      {
        $match: {
          $and: [{ Country: country }, { State: state }],
        },
      },
      {
        $group: {
          _id: {
            country: "$Country",
            state: "$State",
            city: "$City",
          },
          count: { $sum: 1 },
          averageRating: { $avg: "$Rating" },
        },
      },
    ]);
  },
  /**
   * CollegeModel.countCollegesByCountry
   *   @description Gets conut of colleges by state
   */
  countCoursesByState: async (country, state) => {
    return await CollegeModel.model.aggregate([
      {
        $match: {
          $and: [{ Country: country }, { State: state }],
        },
      },
      {
        $unwind: "$Courses",
      },
      {
        $group: {
          _id: { Course: "$Courses" },
          count: {
            $sum: 1,
          },
        },
      },
    ]);
  },
  /**
   * CollegeModel.countCollegesByCountry
   *   @description Gets count by courses offered by country colleges
   */
  countCoursesByCountry: async (country) => {
    return await CollegeModel.model.aggregate([
      {
        $match: {
          $and: [{ Country: country }],
        },
      },
      {
        $unwind: "$Courses",
      },
      {
        $group: {
          _id: { Course: "$Courses" },
          count: {
            $sum: 1,
          },
        },
      },
    ]);
  },
  /**
   * CollegeModel.countCollegesByCountry
   *   @description Gets count by courses offered by city colleges
   */
  countCoursesByCity: async (country, state, city) => {
    return await CollegeModel.model.aggregate([
      {
        $match: {
          $and: [{ Country: country }, { State: state }, { City: city }],
        },
      },
      {
        $unwind: "$Courses",
      },
      {
        $group: {
          _id: { Course: "$Courses" },
          count: {
            $sum: 1,
          },
        },
      },
    ]);
  },
  /**
   * CollegeModel.listCollegesByCity
   *   @description Gets all colleges of a particular city
   *   @returns all colleges of the city
   */
  listCollegesByCity: async (country, state, city) => {
    console.log("[ PARAMS ]", country, state, city);
    return await CollegeModel.model.aggregate([
      {
        $match: {
          $and: [{ Country: country }, { State: state }, { City: city }],
        },
      },
      {
        $project: {
          _id: 1,
          Name: 1,
          Year: 1,
          Country: 1,
          State: 1,
          City: 1,
          Courses: 1,
          Rating: 1,
          Students: { $size: "$Students" },
        },
      },
      {
        $addFields: {
          key: "$_id",
        },
      },
    ]);
  },
  /**
   * CollegeModel.listCollegesByState
   *   @description Gets all colleges of a particular state
   *   @returns all colleges of the state
   */
  listCollegesByState: async (country, state) => {
    console.log("[ PARAMS ]", country, state);
    return await CollegeModel.model.aggregate([
      {
        $match: {
          $and: [{ Country: country }, { State: state }],
        },
      },
      {
        $project: {
          _id: 1,
          Name: 1,
          Year: 1,
          Country: 1,
          State: 1,
          City: 1,
          Courses: 1,
          Rating: 1,
          Students: { $size: "$Students" },
        },
      },
      {
        $addFields: {
          key: "$_id",
        },
      },
    ]);
  },
  /**
   * College list by country
   */
  listCollegesByCountry: async (country) => {
    return await CollegeModel.model.aggregate([
      {
        $match: {
          $and: [{ Country: country }],
        },
      },
      {
        $project: {
          _id: 1,
          Name: 1,
          Year: 1,
          Country: 1,
          State: 1,
          City: 1,
          Courses: 1,
          Rating: 1,
          Students: { $size: "$Students" },
        },
      },
      {
        $addFields: {
          key: "$_id",
        },
      },
    ]);
  },
  /**
   * list of state colleges offering a course
   */
  listStateCollegesByCourse: async (country, state, course) => {
    console.log("[ PARAMS ]", country, state);
    return await CollegeModel.model.aggregate([
      {
        $match: {
          $and: [{ Country: country }, { State: state }],
        },
      },
      { $unwind: "$Courses" },
      { $match: { Courses: course } },
      {
        $project: {
          _id: 1,
          Name: 1,
          Year: 1,
          Country: 1,
          State: 1,
          City: 1,
          Courses: 1,
          Rating: 1,
          Students: { $size: "$Students" },
        },
      },
      {
        $addFields: {
          key: "$_id",
        },
      },
    ]);
  },
  /**
   * list of city colleges offering a course
   */
  listCityCollegesByCourse: async (country, state, city, course) => {
    return await CollegeModel.model.aggregate([
      {
        $match: {
          $and: [{ Country: country }, { State: state }, { City: city }],
        },
      },
      { $unwind: "$Courses" },
      { $match: { Courses: course } },
      {
        $project: {
          _id: 1,
          Name: 1,
          Year: 1,
          Country: 1,
          State: 1,
          City: 1,
          Courses: 1,
          Rating: 1,
          Students: { $size: "$Students" },
        },
      },
      {
        $addFields: {
          key: "$_id",
        },
      },
    ]);
  },
  /**
   * list of country colleges offering a course
   */
  listCountryCollegesByCourse: async (country, course) => {
    return await CollegeModel.model.aggregate([
      {
        $match: {
          $and: [{ Country: country }],
        },
      },
      { $unwind: "$Courses" },
      { $match: { Courses: course } },
      {
        $project: {
          _id: 1,
          Name: 1,
          Year: 1,
          Country: 1,
          State: 1,
          City: 1,
          Courses: 1,
          Rating: 1,
          Students: { $size: "$Students" },
        },
      },
      {
        $addFields: {
          key: "$_id",
        },
      },
    ]);
  },
  /**
   * CollegeModels.listCollegeStudents
   *   @description Gets College Id by College Name
   *   @param none
   *   @returns OBJECT of College with only _id as key
   *
   */
  findCollegeIdByName: (Name) => {
    return new Promise(async (resolve, reject) => {
      try {
        const collegeId = await CollegeModel.model.aggregate([
          { $match: { Name: Name } },
          { $project: { _id: 1 } },
        ]);
        console.log("CollegeId", collegeId[0]._id);
        resolve(collegeId[0]._id);
      } catch (err) {
        reject(err);
      }
    });
  },
};

export default CollegeModel;
