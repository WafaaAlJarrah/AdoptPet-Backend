import { User } from "../Models/userModel";

//registering a new User
export const registerUser = async (req, res) => {
  const { fullName, email, password } = req.body;
  const newUser = new User({ fullName, email, password });

  try {
    await newUser.save();
    res.Status(200).json(newUser); // 200 => OK
  } catch (error) {
    res.Status(500).json({ message: error.message }); //500 => Internal Server Error
  }
};
