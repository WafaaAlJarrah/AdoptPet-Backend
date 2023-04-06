import mongoose, { Schema } from "mongoose";

const animalsSchema = new Schema({
  name: String,
  image: { type: Schema.Types.ObjectId, ref: "Image" },
  age: Number,
  type: String, //dog or cat
  gender: String, //male or female
  color: String,
  location: String,
  description: String,
  specification: { type: Schema.Types.ObjectId, ref: "Specification" }, // from specifictions table => get the name of the schema reference
  budget: Number, //pourcentage
});
export const Animal = mongoose.model("Animal", animalsSchema);
