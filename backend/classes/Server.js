// Express
import express from "express";
import http from "http";
import bodyParser from "body-parser";
import * as Sentry from "@sentry/node";
var cookieParser = require("cookie-parser");

import path from "path";

// Swagger
import swaggerUi from "swagger-ui-express";
import yaml from "yamljs";

// Logging
import Logger from "./Logger";
import { exitLog } from "erel";

// Properties
import properties from "../properties.js";

// Security
import cors from "cors";
import helmet from "helmet";

// Databases
import Database from "./Database.js";
// Controllers
import CollegeController from "../controllers/CollegeController";
import StudentController from "../controllers/StudentController";
import FakeDataController from "../controllers/FakeDataController";

// End Import Controllers

//Environment
import dotenv from "dotenv";
class Server {
  constructor() {
    this.app = express();
  }

  /**
   * Start the server
   * @returns {Promise<void>}
   */
  async init() {
    dotenv.config();
    Logger.info("Starting college-stats application");

    // Securitiy
    this.app.use(helmet());
    this.app.use(cors());

    //Configuring the sentry instance
    Sentry.init({ dsn: process.env.SENTRY_DSN });
    // Start Init Database
    Database.init();
    // End Init Database

    // Configure logger
    exitLog.setLogger(Logger.exitMiddleware);

    //Add sentry
    //this.app.use(Sentry.Handlers.requestHandler());

    // Add parser
    this.app.use(bodyParser.json());
    // For beacon api, Ref: https://stackoverflow.com/questions/31355128/how-to-receive-data-posted-by-navigator-sendbeacon-on-node-js-server
    this.app.use(bodyParser.text());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(exitLog.middleware);
    this.app.use(Logger.expressMiddleware);

    // Swagger
    // const swaggerDocument = yaml.load("./swagger.yaml");
    // this.app.use(
    //   properties.api + "/docs",
    //   swaggerUi.serve,
    //   swaggerUi.setup(swaggerDocument)
    // );

    // Start App Server
    const server = http.Server(this.app);

    await server.listen(properties.port);
    Logger.info("Server started on port " + properties.port);
    // Logger.info(
    //   "Swagger docs at http://localhost:" +
    //     properties.port +
    //     properties.api +
    //     "/docs"
    // );

    // Import controllers
    const router = express.Router();

    // Start Init Controllers
    CollegeController.init(router);
    StudentController.init(router);
    FakeDataController.init(router);

    // End Init Controllers

    this.app.use("/", router);
    this.app.use(Sentry.Handlers.errorHandler());
  }
}

export default new Server();
