import { Specification } from "../Models/specificationModel/index.js";

//new specification
export const addSpecification = async (req, res) => {
  const newSpecification = new Specification(req.body);
  try {
    await newSpecification.save();
    res.json("Specification added successfully!"); //status(200)
  } catch (error) {
    res.json(error); //status(500)
  }
};
//get all specifications for specific type dogs or cats
export const allSpecifications = async (req, res) => {
  const type = req.params.type;
  try {
    const specifications = await Specification.find({ animalType: type });
    res.json(specifications); //status(200)
  } catch (error) {
    res.json(error); //status(500)
  }
};
