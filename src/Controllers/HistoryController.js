import { History } from "../Models/historyModel/index.js";

//add new history
export const addHistory = async (req, res) => {
  const newHistory = new History(req.body);
  try {
    await newHistory.save();
    res.json("History added successfully!"); //status(200)
  } catch (error) {
    res.json(error); //status(500)
  }
};

//get Histories
export const getHistories = async (req, res) => {
  try {
    const histories = await History.find()
      .populate({
        path: "requestInfo",
        populate: {
          path: "sender",
          select: "fullName email",
        },
      })
      .populate({
        path: "requestInfo",
        populate: {
          path: "animal",
        },
      });
    res.json(histories); //status(200)
  } catch (error) {
    res.json(error); //status(500)
  }
};
