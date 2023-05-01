import express from "express";
import { addHistory, getHistories } from "../Controllers/HistoryController.js";

const HistoryRoute = express.Router();

HistoryRoute.post("/", addHistory);
HistoryRoute.get("/", getHistories);

export default HistoryRoute;
