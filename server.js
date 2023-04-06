import express from "express";
import bodyParser from "body-parser";
import animalRouter from "./src/Routes/animalRouter/index.js";
import { connectToDB } from "./db-connection.js";
import userRouter from "./src/Routes/userRouter/index.js";
import specificationRouter from "./src/Routes/specificationRouter/index.js";
import requestRouter from "./src/Routes/requestRouter/index.js";
import historyRouter from "./src/Routes/historyRouter/index.js";
const app = express();

//jsonParser to allow server accept body from request
const jsonParser = bodyParser.json();
app.use(jsonParser);

app.use(animalRouter);
app.use(userRouter);
app.use(specificationRouter);
app.use(requestRouter);
app.use(historyRouter);

connectToDB()
  .then(() => {
    console.log("Connected to Mongoose");
    app.listen(5000, () => {
      console.log("listening on port 5000...");
    });
  })
  .catch((err) => console.log(err));
