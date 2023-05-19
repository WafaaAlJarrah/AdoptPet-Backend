import { Specification } from "../Models/specificationModel/index.js";

//new specification
export const addSpecification = async (req, res) => {
  const newSpecification = new Specification(req.body);
  try {
    await newSpecification.save();
    res.status(200).json(newSpecification);
  } catch (error) {
    res.status(500).json(error);
  }
};

//get all specifications for specific type dogs or cats
export const allSpecifications = async (req, res) => {
  const type = req.params.type;
  try {
    const specifications = await Specification.find({ animalType: type });
    res.status(200).json(specifications);
  } catch (error) {
    res.status(500).json(error);
  }
};
