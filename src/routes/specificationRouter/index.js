import express from "express";
import { Specification } from "../../Models/specificationModel/index.js";

const specificationRouter = express.Router();

specificationRouter.get("/specification", async (req, res) => {
  const specifications = await Specification.find();
  console.log("get is running");
  res.send("this my list : " + specifications);
});

export default specificationRouter;

specificationRouter.post("/specification", async (req, res) => {
    const { name, animalType} = req.body;
    const newSpecification =new Specification({
        name, 
        animalType,
    });
    await newSpecification.save();
    console.log("get is running");
    res.send("this my list : " + newSpecification);
  });