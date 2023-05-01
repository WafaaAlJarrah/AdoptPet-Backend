import express from "express";
import {
  addAnimal,
  deleteAnimal,
  getAnimal,
  getAnimals,
  getAnimalsBySpecification,
  likeAnimal,
  updateAnimal,
} from "../Controllers/AnimalController.js";

const AnimalRoute = express.Router();

AnimalRoute.post("/", addAnimal);
AnimalRoute.get("/:id", getAnimal);
AnimalRoute.get("/", getAnimals);
AnimalRoute.get("/:specificationId", getAnimalsBySpecification);
AnimalRoute.put("/:id", updateAnimal);
AnimalRoute.delete("/:id", deleteAnimal);
AnimalRoute.put("/:id/like", likeAnimal);
// AnimalRoute.get("/", bestAnimals);

export default AnimalRoute;
