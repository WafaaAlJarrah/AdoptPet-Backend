import mongoose, { Schema } from "mongoose";

const specificationsSchema = new Schema(
  {
    name: { type: String, required: true },
    image: String,
    animalType: { type: String, required: true }, //dog or cat or both
  },
  { timestamps: true }
);
export const Specification = mongoose.model(
  "Specification",
  specificationsSchema
);
