import mongoose, { Schema } from "mongoose";

const usersSchema = new Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phoneNB: { type: Number, required: true },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);
export const User = mongoose.model("User", usersSchema);
