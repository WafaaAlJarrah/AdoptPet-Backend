import mongoose, { Schema } from "mongoose";

const requestsSchema = new Schema(
  {
    message: { type: String, required: true },
    // requestDate: Date,
    sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
    //senderName: String, //user.name
    //senderEmail: String, //user.email
    animal: { type: Schema.Types.ObjectId, ref: "Animal", required: true },
    // animalID: ObjectId, //animal.id
    // animalName: String, //animal.name
    // animalDescrp: String, // animal.description
    // animalBudget: Number, //animal.budget
  },
  { timestamps: true }
);
export const Request = mongoose.model("Request", requestsSchema);
