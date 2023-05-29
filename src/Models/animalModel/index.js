import mongoose, { Schema } from "mongoose";

const animalsSchema = new Schema(
  {
    name: { type: String, required: true },
    image: String,
    adopted: { type: Boolean, required: true, default: false },
    age: { type: Number, required: true },
    type: { type: String, required: true }, //dog or cat
    gender: { type: String, required: true }, //male or female
    color: { type: String, required: true },
    location: String,
    description: { type: String, required: true },
    // specification: {
    //     type: String,
    //     required: true,
    //   },
    specification: {
      type: Schema.Types.ObjectId,
      ref: "Specification",
      required: true,
    }, // from specifictions table => get the name of the schema reference
    budget: Number, //pourcentage
    likes: [], //table of users ID
    archived: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
export const Animal = mongoose.model("Animal", animalsSchema);
