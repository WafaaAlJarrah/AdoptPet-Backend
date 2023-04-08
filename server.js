import express from "express";
import bodyParser from "body-parser";
import { connectToDB } from "./db-connection.js";
import specificationRouter from "./src/Routes/specificationRouter/index.js";
import requestRouter from "./src/Routes/requestRouter/index.js";
import historyRouter from "./src/Routes/historyRouter/index.js";
import AuthRoute from "./src/Routes/AuthRoute.js";
import UserRoute from "./src/Routes/UserRoute.js";
import AnimalRoute from "./src/Routes/AnimalRoute.js";

//Routes
const app = express();

//Middleware
app.use(bodyParser.json()); //jsonParser to allow server accept body from request

app.use(specificationRouter);
app.use(requestRouter);
app.use(historyRouter);

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
