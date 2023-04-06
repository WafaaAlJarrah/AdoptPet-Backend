import express from "express";
import { History } from "../../Models/historyModel/index.js";

const historyRouter = express.Router();
historyRouter.get("/history", async (req, res) => {
  // const { type } = req.query;
  // let filter = {};
  // if (type.length) {
  //   filter = {
  //     type,
  //   };
  // }
  //const historys = await History.find(filter);
  const histories = await History.find()
    .populate({
      path: "requestInfo",
      populate: {
        path: "animal",
      },
    })
    .populate({
      path: "requestInfo",
      populate: {
        path: "sender",
      },
    });
  console.log("get is running from backend project");
  res.send("from backend project, this my list : " + histories);
});

historyRouter.post("/history", async (req, res) => {
  const { requestInfo, status } = req.body;
  const newHistory = new History({
    requestInfo,
    status,
    historyDate: new Date(),
  });
  await newHistory.save(); //save() used to send this new data to mongoDB
  console.log("post is running");
  res.send("History " + newHistory);
});

// historyRouter.delete("/history/delete", async (req, res) => {
//   const { _id } = req.query;
//   const deletedhistory = await History.deleteOne({ _id });
//   res.send("history deleted ");
// });

// historyRouter.put("/history/", async (req, res) => {
//   const { _id } = req.query;
//   const updatedhistory = await History.updateOne({ _id }, { type: "dog" });
//   res.send("history updated ");
// });
export default historyRouter;
