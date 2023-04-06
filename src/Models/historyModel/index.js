import { ObjectId } from "bson";
import mongoose, { Schema } from "mongoose";

const historiesSchema = new Schema({
  status: String, //adopted or not adopted //from accept or reject buttons
  historyDate: Date, 
  requestInfo: { type: Schema.Types.ObjectId, ref: "Request" },
  // requestId: ObjectId,
  // requestDate: new Date(),
  // clientName: String, //request.senderName
  // clientEmail: String,//request.SenderEmail
  //animal: { type: Schema.Types.ObjectId, ref: "Animal" },
  // animalID: ObjectId, //animal.id
  // animalBudget : Number, //animal.budget
});
export const History = mongoose.model("History", historiesSchema, "histories");
