import express from "express";
import bodyParser from "body-parser";
import animalRouter from "./src/routes/animalRouter/index.js";
import { connectToDB } from "./db-connection.js";
import userRouter from "./src/routes/userRouter/index.js";
import specificationRouter from "./src/routes/specificationRouter/index.js";
import requestRouter from "./src/routes/requestRouter/index.js";
import historyRouter from "./src/routes/historyRouter/index.js";
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
