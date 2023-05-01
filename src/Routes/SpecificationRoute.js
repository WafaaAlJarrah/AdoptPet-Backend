import express from "express";
import {
  addSpecification,
  allSpecifications,
} from "../Controllers/SpecificationController.js";

const SpecificationRoute = express.Router();

SpecificationRoute.post("/", addSpecification);
SpecificationRoute.get("/:type", allSpecifications);

export default SpecificationRoute;
