import express from "express";
import { Request } from "../../Models/requestModel/index.js";

const requestRouter = express.Router();
requestRouter.get("/request/", async (req, res) => {
  // const { type } = req.query;
  // let filter = {};
  // if (type.length) {
  //   filter = {
  //     type,
  //   };
  // }
  //const requests = await request.find(filter);
  const requests = await Request.find()
  .populate({ path: 'sender', select: 'name' })
  .populate({ path: 'sender', select: 'email' })
  .populate("animal");
  console.log("get is running");
  res.send("this my list posted : " + requests);
});

requestRouter.post("/request", async (req, res) => {
  const { message, sender, animal } = req.body; ///
  const newRequest = new Request({
    message,
    requestDate : new Date(),
    sender,
    animal,
  });
  await newRequest.save(); //save() used to send this new data to mongoDB
  console.log("post is running");
  res.send("request " + newRequest);
});

// requestRouter.delete("/request/delete", async (req, res) => {
//   const { _id } = req.query;
//   const deletedRequest = await Request.deleteOne({ _id });
//   res.send("request deleted ");
// });

// requestRouter.put("/request/", async (req, res) => {
//   const { _id } = req.query;
//   const updatedRequest = await Request.updateOne({ _id }, { type: "dog" });
//   res.send("request updated ");
// });
export default requestRouter;
