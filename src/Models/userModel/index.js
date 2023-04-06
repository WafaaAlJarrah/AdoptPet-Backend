import mongoose, { Schema } from "mongoose";

const usersSchema = new Schema({
  fullName: String,
  email: String,
  password: String,
  phoneNB: Number,
  role: String, //client or admin
});
export const User = mongoose.model("User", usersSchema);
