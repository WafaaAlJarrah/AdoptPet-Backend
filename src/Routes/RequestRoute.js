import express from "express";
import {
  addRequest,
  archiveRequest,
  getRequests,
} from "../Controllers/RequestController.js";

const RequestRoute = express.Router();

RequestRoute.post("/", addRequest);
RequestRoute.get("/", getRequests);
RequestRoute.put("/archive/:requestId", archiveRequest);

export default RequestRoute;
