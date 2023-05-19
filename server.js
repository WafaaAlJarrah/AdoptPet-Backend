import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { connectToDB } from "./db-connection.js";
import AuthRoute from "./src/Routes/AuthRoute.js";
import UserRoute from "./src/Routes/UserRoute.js";
import AnimalRoute from "./src/Routes/AnimalRoute.js";
import SpecificationRoute from "./src/Routes/SpecificationRoute.js";
import RequestRoute from "./src/Routes/RequestRoute.js";
import HistoryRoute from "./src/Routes/HistoryRoute.js";
import UploadRoute from "./src/Routes/UploadRoute.js";
//Routes
const app = express();

//Middleware
app.use(bodyParser.json()); //jsonParser to allow server accept body from request
app.use(cors());
//Connection
connectToDB()
  .then(() => {
    console.log("Connected to Mongoose");
    app.listen(5000, () => {
      console.log("listening on port 5000...");
    });
  })
  .catch((err) => console.log(err));

//usage of routes
app.use("/auth", AuthRoute);
app.use("/user", UserRoute);
app.use("/animal", AnimalRoute);
app.use("/specification", SpecificationRoute);
app.use("/request", RequestRoute);
app.use("/history", HistoryRoute);
app.use("/upload", UploadRoute);
