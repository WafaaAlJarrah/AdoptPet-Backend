import mongoose, { Schema } from "mongoose";

const requestsSchema = new Schema({
  message: String,
  requestDate: Date,
  sender: { type: Schema.Types.ObjectId, ref: "User" }, 
  //senderName: String, //user.name
  //senderEmail: String, //user.email
  animal: { type: Schema.Types.ObjectId, ref: "Animal" },
  // animalID: ObjectId, //animal.id
  // animalName: String, //animal.name
  // animalDescrp: String, // animal.description
  // animalBudget: Number, //animal.budget
});
export const Request = mongoose.model("Request", requestsSchema);
