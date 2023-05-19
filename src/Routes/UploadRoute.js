import express from "express";

const UploadRoute = express.Router();

import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./src/public/UploadedImages");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});
const upload = multer({ storage: storage });

UploadRoute.post("/", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploded successfully");
  } catch (error) {
    console.error("error from uploadRoute: ",error);
  }
});

export default UploadRoute;
