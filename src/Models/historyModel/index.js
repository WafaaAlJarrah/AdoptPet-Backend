import { ObjectId } from "bson";
import mongoose, { Schema } from "mongoose";

const historiesSchema = new Schema(
  {
    status: { type: String, required: true }, //accepted or rejected
    // historyDate: Date,
    requestInfo: { type: Schema.Types.ObjectId, ref: "Request" },
    // requestId: ObjectId,
    // requestDate: new Date(),
    // clientName: String, //request.senderName
    // clientEmail: String,//request.SenderEmail
    //animal: { type: Schema.Types.ObjectId, ref: "Animal" },
    // animalID: ObjectId, //animal.id
    // animalBudget : Number, //animal.budget
  },
  { timestamps: true }
);
export const History = mongoose.model("History", historiesSchema, "histories");
