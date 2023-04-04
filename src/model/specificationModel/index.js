import mongoose, { Schema } from "mongoose";

const specificationsSchema = new Schema({
  name: String,
  animalType : [String],//dog or cat or both // !!!! most be an array of string
});
export const Specification = mongoose.model("Specification", specificationsSchema);
