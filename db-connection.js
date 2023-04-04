import mongoose from "mongoose";

export const connectToDB = async () =>{
    const uri =
    "mongodb+srv://Wafaa:uEiUncwSsmkrfzmE@cluster0.5i3vvrn.mongodb.net/test";
  await mongoose.connect(uri);
};