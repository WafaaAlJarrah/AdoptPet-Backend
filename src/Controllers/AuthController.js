import { User } from "../Models/userModel/index.js";
import bcrypt from "bcrypt";

//registering a new User
export const registerUser = async (req, res) => {
  const { fullName, email, password } = req.body;

  const saltRounds = await bcrypt.genSalt(10);
  const hashPass = await bcrypt.hash(password, saltRounds);

  const newUser = new User({ fullName, email, password: hashPass });

  try {
    await newUser.save();
    res.json(newUser); //res.Status(200).json(newUser); // 200 => OK
  } catch (error) {
    res.json({ message: error.message }); //500 => Internal Server Error
    //res.Status(500).json({ message: error.message }); /
  }
};

//login user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });

    if (user) {
      const validity = await bcrypt.compare(password, user.password);

      validity ? res.json(user) : res.json("Wrong Password!"); //status(200) or status(400)
    } else {
      res.json("User doesn't exists!");// status(404)
    }
  } catch (error) {
    res.json({ message: error.message }); //status(500)
  }
};
