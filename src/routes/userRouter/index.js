import express from "express";
import { User } from "../../model/userModel/index.js";
import bcrypt from "bcrypt";
const userRouter = express.Router();
// userRouter.get("/user/login", async (req, res) => {
//   const { email, password } = req.query;
//   let filter = {};
//   if (type.length) {
//     filter = {
//       type,
//     };
//   }
//   const users = await user.find(filter);
//   console.log("get is running");
//   res.send("this my list : " + users);
// });

userRouter.post("/user", async (req, res) => {
  const { email, password } = req.body;
  const saltRounds = 10; //????
  const hash = await bcrypt.hash(password, saltRounds); // to save the password in hashed form
  const newUser = new User({
    email,
    password: hash,
  });
  await newUser.save(); //save() used to send this new data to mongoDB
  console.log("post is running");
  res.send("user " + newUser);
});

userRouter.post("/user/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    //user exist => compare password
    const isEqual = await bcrypt.compare(password, user.password);
    res.send({ isEqual });
  } else {
    //user not exist
    res.send("user not exist");
  }
});

// userRouter.delete("/user/delete", async (req, res) => {
//   const { _id } = req.query;
//   const deleteduser = await user.deleteOne({ _id });
//   res.send("user deleted ");
// });

// userRouter.put("/user/", async (req, res) => {
//   const { _id } = req.query;
//   const updateduser = await user.updateOne(
//     { _id },
//     { type: "dog" });
//   res.send("user updated ");
// });

export default userRouter;
