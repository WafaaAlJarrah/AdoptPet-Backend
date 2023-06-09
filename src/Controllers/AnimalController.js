import mongoose from "mongoose";
import { Animal } from "../Models/animalModel/index.js";

//add new animal
export const addAnimal = async (req, res) => {
  const newAnimal = new Animal(req.body);
  try {
    await newAnimal.save();
    res.status(200).json(newAnimal); //status(200)
  } catch (error) {
    res.status(500).json(error); //status(500)
  }
};

//get an animal
export const getAnimal = async (req, res) => {
  const id = req.params.animalId;
  try {
    const animal = await Animal.findById(id).populate({
      path: "specification",
      select: "name",
    });
    //get nb of likes
    const likes = animal.likes.length;
    console.log("nb: ", likes);
    res.status(200).json(animal); //status(200)
  } catch (error) {
    res.status(500).json(error); //status(500)
  }
};

//get animals
export const getAnimals = async (req, res) => {
  try {
    const animals = await Animal.find().populate({
      path: "specification",
      select: "name",
    });
    res.status(200).json(animals); //status(200)
  } catch (error) {
    res.status(500).json(error); //status(500)
  }
};

//get animals by specification selected
export const getAnimalsBySpecification = async (req, res) => {
  const specificationId = req.params.specificationId;
  console.log(specificationId);
  try {
    const animals = await Animal.find({
      specification: specificationId,
    }).populate({
      path: "specification",
      select: "name",
    });
    res.status(200).json(animals); //status(200)
  } catch (error) {
    res.status(500).json(error); //status(500)
  }
};

//update an animal
export const updateAnimal = async (req, res) => {
  const id = req.params.id;

  try {
    const animalUpdated = await Animal.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(animalUpdated); //status(200)
  } catch (error) {
    res.status(500).json(error); //status(500)
  }
};

//archive an animal
export const archiveAnimal = async (req, res) => {
  const id = req.params.id;

  try {
    const archivedAnimal = await Animal.findById(id);
    if (!archivedAnimal) {
      return res.status(404).json({ error: "Animal not found" });
    }
    archivedAnimal.archived = true;
    await archivedAnimal.save();
    res.status(200).json("Animal archieved successfully"); //status(200)
  } catch (error) {
    res.status(500).json(error); //status(500)
  }
};

//delete aniaml
export const deleteAnimal = async (req, res) => {
  const id = req.params.id;

  try {
    await Animal.findByIdAndDelete(id);
    res.status(200).json("Animal deleted successfully"); //status(200)
  } catch (error) {
    res.status(500).json(error); //status(500)
  }
};

//like and dislike animal
export const likeAnimal = async (req, res) => {
  const id = req.params.id;
  const { userId } = req.body;

  try {
    const animal = await Animal.findById(id);
    if (!animal.likes.includes(userId)) {
      await animal.updateOne({ $push: { likes: userId } });
      res.status(200).json("Animal liked successfully"); //status(200)
    } else {
      await animal.updateOne({ $pull: { likes: userId } });
      res.status(200).json("Animal unliked successfully"); //status(200)
    }
  } catch (error) {
    res.json(error); //status(500)
  }
};

// //get best animal(s) (has more likes)
// export const bestAnimals = async (req, res) => {
//   try {
//     const bestAnimals = await Animal.find().sort('-likes').limit(1);

//     res.status(200).json("Animal unliked successfully"); //status(200)
//   } catch (error) {
//     res.status(500).json(error); //status(500)
//   }
// };
