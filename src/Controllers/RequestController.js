import { Request } from "../Models/requestModel/index.js";

//add new Request
export const addRequest = async (req, res) => {
  //animal Id and user Id most getted from url (req.params)
  const newRequest = new Request(req.body);
  try {
    await newRequest.save();
    res.json("Request added successfully!"); //status(200)
  } catch (error) {
    res.json(error); //status(500)
  }
};

//get Requests
export const getRequests = async (req, res) => {
  try {
    const Requests = await Request.find()
      .populate({ path: "sender", select: 'fullName email'})
      .populate("animal");
    res.json(Requests); //status(200)
  } catch (error) {
    res.json(error); //status(500)
  }
};

//delete request
export const deleteRequest = async (req, res) => {
  const id = req.params.id;

  try {
    await Request.findByIdAndDelete(id);
    res.json("Request deleted successfully"); //status(200)
  } catch (error) {
    res.json(error); //status(500)
  }
};
