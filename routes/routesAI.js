import express from "express";
import {
  chatHandler,
  generateTextHandler,
  imageHandler,
  documentHandler,
  audioHandler,
} from "../controller/genAI.js";

const geminiRoutes = ({ ai, upload }) => {
  const router = express.Router();

  // Endpoint untuk chat dengan histori percakapan
  router.post("/api/chat", chatHandler(ai));

  // Endpoint untuk generate teks sederhana
  router.post("/generate-text", generateTextHandler(ai));

  // Endpoint untuk generate dari gambar
  router.post("/generate-from-image", upload.single("image"), imageHandler(ai));

  // Endpoint untuk generate dari dokumen
  router.post(
    "/generate-from-document",
    upload.single("document"),
    documentHandler(ai)
  );

  // Endpoint untuk generate dari audio
  router.post("/generate-from-audio", upload.single("audio"), audioHandler(ai));

  return router;
};

export default geminiRoutes;
