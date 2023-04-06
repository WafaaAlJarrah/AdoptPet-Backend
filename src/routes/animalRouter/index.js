import express from "express";
import { Animal } from "../../Models/animalModel/index.js";

const animalRouter = express.Router();
animalRouter.get("/animal/", async (req, res) => {
  // const { type } = req.query;
  // let filter = {};
  // if (type.length) {
  //   filter = {
  //     type,
  //   };
  // }
  //const animals = await Animal.find(filter);
  const animals = await Animal.find()
  .populate({ path: 'specification', select: 'name' }) //get only the name of this specification
  .populate("image"); 
  console.log("get is running");
  res.send("this my list : " + animals);
});

animalRouter.post("/animal", async (req, res) => {
  const {
    name,
    age,
    type,
    gender,
    color,
    location,
    description,
    specification,
    budget,
  } = req.body;
  const newAnimal = new Animal({
    name,
    age,
    type,
    gender,
    color,
    location,
    description,
    specification,
    budget,
  });
  await newAnimal.save(); //save() used to send this new data to mongoDB
  console.log("post is running");
  res.send("animal " + newAnimal);
});

// animalRouter.delete("/animal/delete", async (req, res) => {
//   const { _id } = req.query;
//   const deletedAnimal = await Animal.deleteOne({ _id });
//   res.send("animal deleted ");
// });

// animalRouter.put("/animal/", async (req, res) => {
//   const { _id } = req.query;
//   const updatedAnimal = await Animal.updateOne({ _id }, { type: "dog" });
//   res.send("animal updated ");
// });
export default animalRouter;
