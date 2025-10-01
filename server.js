import express from "express";
import cors from "cors";
import multer from "multer";
import { GoogleGenAI } from "@google/genai";
import "dotenv/config";
import geminiRoutes from "./routes/routesAI.js";

const app = express();

const ai = new GoogleGenAI({});

const upload = multer({
  dest: "uploads/",
});

app.use(cors());
app.use(express.json());

app.use("/", geminiRoutes({ app, ai, upload }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan dalam port ${PORT}`);
});
