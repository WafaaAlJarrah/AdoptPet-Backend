import { User } from "../Models/userModel/index.js";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import { EMAIL, PASSWORD } from "../env.js";

//registering a new User
export const registerUser = async (req, res) => {
  const saltRounds = await bcrypt.genSalt(10);
  const hashPass = await bcrypt.hash(req.body.password, saltRounds);
  req.body.password = hashPass;
  const newUser = new User(req.body);

  const { email, fullName } = req.body;
  try {
    const oldUser = await User.findOne({ email: email });
    if (oldUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: EMAIL,
        pass: PASSWORD,
      },
    });

    let message = {
      from: `"Adopt Pet Platform" <${EMAIL}>`, // sender address
      to: req.body.email, // list of receivers
      subject: "Welcome to our platform", // Subject line
      html: `<h1>Email Confirmation ✔</h1>
         <h2>Hello ${fullName}</h2>
         <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
         <a href=http://localhost:3000/Login> Click here</a>
         </div>`, // html body
    };

    transporter
      .sendMail(message)
      .then(async (info) => {
        const user = await newUser.save();
        const token = Jwt.sign(
          {
            email: user.email,
            id: user._id,
          },
          "MERN",
          { expiresIn: "1h" }
        );
        return res.status(201).json({
          msg: "you should receive an email",
          info: info.messageId,
          preview: nodemailer.getTestMessageUrl(info),
          newUser: newUser,
        });
      })
      .catch((error) => {
        return res
          .status(500)
          .json({ message: "ERROR from transporter: ", error });
          // if you have tihs error try this way :
          //1. Go to your Google account at https://myaccount.google.com/
          //2. Go to Security
          //3. In "Signing in to Google" section choose 2-Step Verification - here you have to verify yourself
          //4. choose "App passwords", from the Select app drop down choose Mail (* your google account) and from the Select app drop down choose my Windows Computer
          //and now generate a new password that you can use it in your code with the your Mail (* your google account)
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//login user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });

    if (user) {
      const validity = await bcrypt.compare(password, user.password);

      if (!validity) {
        res.status(400).json("Wrong Password");
      } else {
        const token = Jwt.sign(
          {
            email: user.email,
            id: user._id,
          },
          "MERN",
          { expiresIn: "1h" }
        );
        res.status(200).json("User logged in");
      }
    } else {
      res.status(404).json("User doesn't exists!");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
