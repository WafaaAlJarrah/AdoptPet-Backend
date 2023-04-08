import { Animal } from "../Models/animalModel/index.js";

//add new animal
export const addAnimal = async (req, res) => {
  const newAnimal = new Animal(req.body);
  try {
    await newAnimal.save();
    res.json("Animal added successfully!"); //status(200)
  } catch (error) {
    res.json(error); //status(500)
  }
};

//get an animal
export const getAnimal = async (req, res) => {
  const id = req.params.id;
  try {
    const animal = await Animal.findById(id);
    res.json(animal); //status(200)
  } catch (error) {
    res.json(error); //status(500)
  }
};

//get animals
export const getAnimals = async (req, res) => {
  try {
    const animals = await Animal.find();
    res.json(animals); //status(200)
  } catch (error) {
    res.json(error); //status(500)
  }
};

//update an animal
export const updateAnimal = async (req, res) => {
  const id = req.params.id;

  try {
    const animalUpdated = await Animal.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json("Animal updated successfully"); //status(200)
  } catch (error) {
    res.json(error); //status(500)
  }
};

//delete aniaml
export const deleteAnimal = async (req, res) => {
  const id = req.params.id;

  try {
    await Animal.findByIdAndDelete(id);
    res.json("Animal deleted successfully"); //status(200)
  } catch (error) {
    res.json(error); //status(500)
  }
};

//like and dislike post
export const likeAnimal = async (req, res) => {
  const id = req.params.id;
  const { userId } = req.body;

  try {
    const animal = await Animal.findById(id);
    if (!animal.likes.includes(userId)) {
      await animal.updateOne({ $push: { likes: userId } });
      res.json("Animal liked successfully"); //status(200)
    } else {
      await animal.updateOne({ $pull: { likes: userId } });
      res.json("Animal unliked successfully"); //status(200)
    }
  } catch (error) {
    res.json(error); //status(500)
  }
};
