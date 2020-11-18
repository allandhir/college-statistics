import Properties from "../properties";
import StudentModel from "../models/StudentModel";
import CollegeModel from "../models/CollegeModel";
import ErrorManager from "../classes/ErrorManager";
const faker = require("faker");

const country = ["India", "Germany", "US", "France", "Australia"];
const state = [
  ["Telangana", "Andhra Pradesh", "Maharastra", "Delhi", "Tamil Nadu"],
  ["Berlin", "Hamburg", "Brimen", "Saxony", "Westphalia"],
  ["Washington", "California", "Ohio", "Georgia", "Colorado"],
  ["Paris", "Bourges", "Orleans", "Normandy", "Lyonnais"],
  ["Wales", "Queensland", "Victoria", "Tasmania", "South Australia"],
];
const courseList = ["CSE", "ECE", "CIVIL", "MECHANICAL", "CHEMICAL", "EEE"];
const skillsList = [
  "Java",
  "C",
  "C++",
  "Python",
  "Ruby",
  "Scala",
  "JS",
  "ML",
  "ReactJS",
  "NodeJS",
  "AWS",
];

const fakeDataController = {
  /**
   * Init routes
   */
  init: (router) => {
    const baseUrl = `${Properties.api}/fake`;
    router.put(baseUrl + "", fakeDataController.put);
  },

  // CRUD METHODS
  /**
   *   @description CRUD ACTION put fake data into DB
   *
   */
  put: async (req, res) => {
    var allStudents = [];
    try {
      for (var i = 0; i < 100; i++) {
        const collegeName = faker.company.companyName();
        const randIndex = fakeDataController.getRandomInt(0, 4);
        const courses = [];
        for (var k = 0; k < fakeDataController.getRandomInt(1, 6); k++) {
          const courseName = courseList[fakeDataController.getRandomInt(0, 4)];
          if (courses.indexOf(courseName) === -1) courses.push(courseName);
          else k--;
        }
        const college = {
          Name: collegeName,
          Year: fakeDataController.getRandomInt(1960, 2005),
          Country: country[randIndex],
          State: state[randIndex][fakeDataController.getRandomInt(0, 4)],
          City: "City-" + fakeDataController.getRandomInt(1, 3),
          Courses: courses,
          Rating: fakeDataController.getRandomInt(1, 5),
        };
        const collegeObj = await CollegeModel.create(college);
        // console.log("collegeObj", collegeObj);
        for (var j = 0; j < 100; j++) {
          const firstName = faker.name.firstName();
          let skills = [];
          for (var s = 0; s < fakeDataController.getRandomInt(1, 4); s++) {
            const skill = skillsList[fakeDataController.getRandomInt(0, 10)];
            if (skills.indexOf(skill) === -1) skills.push(skill);
            else s--;
          }
          let history = [];
          for (var m = 0; m < 18; m++) {
            history.push(fakeDataController.getRandomInt(30, 100));
          }
          const student = {
            Fname: firstName,
            Lname: faker.name.lastName(),
            Email: firstName + "@gmail.com",
            CollegeName: collegeName,
            Year: fakeDataController.getRandomInt(2015, 2020),
            College: collegeObj._id,
            Course:
              courses[fakeDataController.getRandomInt(0, courses.length - 1)],
            AcademicHistory: history,
            Skills: skills,
          };
          allStudents.push(student);
        }
      }
      let allStu = await StudentModel.getModel().insertMany(allStudents);
      // console.log("RESULT", allStu);

      allStu.forEach(async (student) => {
        // console.log("COLLEGEID", student.College, student._id);
        await CollegeModel.getModel().findOneAndUpdate(
          { _id: student.College },
          { $addToSet: { Students: student._id } }
        );
      });
      console.log(
        "Insertion Successfull",
        fakeDataController.getRandomInt(0, 1)
      );

      res.send("[ OK ] Fake Data Inserted");
    } catch (err) {
      const safeErr = ErrorManager.getSafeError(err);
      res.status(safeErr.status).json(safeErr);
    }
  },
  //random int data function
  getRandomInt: (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
};

export default fakeDataController;
