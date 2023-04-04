import mongoose, { Schema } from "mongoose";

const usersSchema = new Schema({
  name: String,
  email: String,
  password: String,
  phoneNB: Number,
  location: String,
  role: String, //client or admin
});
export const User = mongoose.model("User", usersSchema);
