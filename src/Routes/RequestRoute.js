import express from "express";
import { addRequest, getRequests } from "../Controllers/RequestController.js";

const RequestRoute = express.Router();

RequestRoute.post("/", addRequest);
RequestRoute.get("/", getRequests);

export default RequestRoute;
