import { User } from "../Models/userModel/index.js";
import bcrypt from "bcrypt";

//get user
export const getUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id);

    if (user) {
      const { password, ...otherDetails } = user._doc; // _doc separate password from all other details and return only otherDetails
      res.json(otherDetails); //status(200)
    } else {
      res.json("No such user exists");
    }
  } catch (error) {
    res.json(error); //status(500)
  }
};

//update a user
export const updateUser = async (req, res) => {
  const id = req.params.id;
  const { currentId, password } = req.body;

  //EACH user can update only their OWN data
  if (id === currentId) {
    try {
      //if we have to update password => it will be hashed again
      if (password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(password, salt);
      }

      const updatedUser = await User.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.json(updatedUser); //status(200)
    } catch (error) {
      res.json(error); //status(500)
    }
  } else {
    res.json("Access Denied! you can only update your own profile");
  }
};

//delete user
export const deleteUser = async (req, res) => {
  const id = req.params.id;
  const { currentId } = req.body;

  //EACH user can delete only their OWN data
  if (id === currentId) {
    try {
      await User.findByIdAndDelete(id);
      res.json("User deleted successfully"); //status(200)
    } catch (error) {
      res.json(error); //status(500)
    }
  } else {
    res.json("Access Denied! you can only delete your own profile");
  }
};
