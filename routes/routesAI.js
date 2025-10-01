import express from "express";
import {
  chatHandler,
  imageHandler,
  documentHandler,
  audioHandler,
} from "../controller/genAI.js";

export default ({ ai, upload }) => {
  const router = express.Router();

  // End Point Chat
  router.post("/chat", chatHandler(ai));

  // End point generate text from image (dengan multer middleware)
  router.post("/generate-from-image", upload.single("image"), imageHandler(ai));

  // End point generate text from document (dengan multer middleware)
  router.post(
    "/generate-from-document",
    upload.single("document"),
    documentHandler(ai)
  );

  // End point generate text from audio (dengan multer middleware)
  router.post("/generate-from-audio", upload.single("audio"), audioHandler(ai));

  return router;
};
