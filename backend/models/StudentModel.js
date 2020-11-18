// Database
import Database from "../classes/Database";
import mongoose, { Schema } from "mongoose";

// Logger
import Logger from "../classes/Logger";
const ObjectId = mongoose.Types.ObjectId;
const studentModel = {
  /**
   * Init  schema
   */
  init() {
    const db = Database.getConnection();

    /**
     * Student
     */
    const studentSchema = new mongoose.Schema(
      {
        Fname: {
          type: String,
        },
        Lname: {
          type: String,
        },
        Year: {
          type: String,
        },
        Email: {
          type: String,
        },
        CollegeName: {
          type: String,
        },
        Course: {
          type: String,
        },
        Skills: [{ type: String }],
        AcademicHistory: [{ type: Number }],
        College: { type: Schema.Types.ObjectId, ref: "College" },
      }
      // { timestamps: true }
    );
    studentSchema.index({ Email: 1 });
    studentModel.setModel(db.connection.model("Student", studentSchema));

    return studentSchema;
  },

  /**
   * Set Model
   */
  setModel: (model) => {
    studentModel.model = model;
  },

  /**
   * Get model
   */
  getModel: () => {
    return studentModel.model;
  },

  // Start queries

  // CRUD METHODS
  /**
   * StudentModel.create
   *   @description CRUD ACTION create
   *
   */
  async create(item) {
    const obj = new studentModel.model(item);
    return await obj.save();
  },
  /**
   * StudentModel.delete
   *   @description CRUD ACTION delete
   *   @param ObjectId id Id
   *
   */
  async delete(id) {
    return await studentModel.model.findByIdAndRemove(id);
  },

  /**
   * StudentModel.list
   *   @description Gets all teachers
   *   @returns ARRAY OF Teachers
   *
   */
  async list() {
    return await studentModel.model.find();
  },
  /**
   * studentModel.get
   *   @description CRUD ACTION get
   *   @param ObjectId id Id resource
   *
   */
  async get(id) {
    return await studentModel.model.findOne({ _id: id });
  },
  // Start custom queries
  // /**
  //  * studentModel.listAllColleges
  //  *   @description Gets all colleges of a student
  //  *   @param _id teacher id _id
  //  *   @returns ARRAY OF Colleges
  //  *
  //  */
  // listCollege: async (_id) => {
  //   return await studentModel.model
  //     .findOne({ _id })
  //     .populate("College")
  //     .select("College");
  // },

  /**
   * @description get academic history of a particular student
   */
  listAcademicHistory: async (studentId) => {
    return await studentModel.model.aggregate([
      {
        $match: { _id: ObjectId(studentId) },
      },
      {
        $project: {
          AcademicHistory: 1,
        },
      },
    ]);
  },
};

export default studentModel;
