import mongoose, { Schema } from "mongoose";

const imagesSchema = new Schema({
  type: String,
  data: Buffer,
});
export const Image = mongoose.model("Image", imagesSchema);
