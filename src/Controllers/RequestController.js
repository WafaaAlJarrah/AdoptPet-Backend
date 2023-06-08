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
      .populate({path:"animal", populate: { path: "specification", select: '_id name'}}); 
    res.json(Requests); //status(200)
  } catch (error) {
    res.json(error); //status(500)
  }
};

//archive a request
export const archiveRequest = async (req, res) => {
  const requestId = req.params.requestId;

  try {
    const archivedRequest = await Request.findById(requestId);
    if (!archivedRequest) {
      return res.status(404).json({ error: "Request not found" });
    }
    archivedRequest.archived = true;
    await archivedRequest.save();
    res.status(200).json("Request archieved successfully"); //status(200)
  } catch (error) {
    res.status(500).json(error); //status(500)
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
