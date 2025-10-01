// Code V1

// import express, { text } from "express";
// import cors from "cors";
// import multer from "multer";

// import {
//   createPartFromUri,
//   createUserContent,
//   GoogleGenAI,
// } from "@google/genai";

// import fs from "fs";

// import "dotenv/config";

// import { trace } from "console";

// // Persiapan project

// const app = express();

// const ai = new GoogleGenAI({});

// // Persiapan middleware

// app.use(cors());

// const upload = multer({
//   dest: "uploads/",
// });

// app.use(express.json());

// // Persiapan end point

// // End Point POST

// app.post("/chat", async (req, res) => {
//   const { body } = req;

//   const { prompt } = body;

//   //   Cek data yang di input di prompt

//   if (!prompt || typeof prompt !== "string") {
//     res.status(400).json({
//       message: "Prompt harus di isi dan berupa string!",

//       data: null,

//       success: false,
//     });

//     return;
//   }

//   try {
//     const aiResponse = await ai.models.generateContent({
//       model: "gemini-2.5-flash",

//       contents: [
//         {
//           parts: [{ text: prompt }],
//         },
//       ],
//     });

//     res.status(200).json({
//       success: true,

//       data: aiResponse.text,

//       message: "Berhasil diresponse oleh AI Flash",
//     });
//   } catch (error) {
//     console.log(e);

//     res.status(500).json({
//       success: false,

//       data: null,

//       message: e.message || "Ada masalah di server",
//     });
//   }
// });

// // End Point Generate Text

// app.post("/generate-text", async (req, res) => {
//   const { prompt } = req.body;

//   try {
//     const aiResponse = await ai.models.generateContent({
//       model: "gemini-2.5-flash",

//       contents: [
//         {
//           parts: [{ text: prompt }],
//         },
//       ],
//     });

//     res.status(200).json({
//       success: true,

//       data: aiResponse.text,

//       message: "Berhasil diresponse oleh AI Flash",
//     });
//   } catch (error) {
//     console.log(error);

//     res.status(500).json({
//       success: false,

//       data: null,

//       message: error.message || "Ada masalah di server",
//     });
//   }
// });

// // End point generate text from image

// app.post("/generate-from-image", upload.single("image"), async (req, res) => {
//   const { prompt = "Describe this uploaded image." } = req.body;

//   try {
//     const image = await ai.files.upload({
//       file: req.file.path,

//       config: {
//         mimeType: req.file.mimetype,
//       },
//     });

//     const result = await ai.models.generateContent({
//       model: "gemini-2.5-flash",

//       contents: [
//         createUserContent([
//           prompt,

//           createPartFromUri(image.uri, image.mimeType),
//         ]),
//       ],
//     });

//     res.json({ output: result.text });
//   } catch (error) {
//     console.log(error);

//     res.status(500).json({
//       success: false,

//       data: null,

//       message: e.message || "Ada masalah di server",
//     });
//   } finally {
//     fs.unlinkSync(req.file.path);
//   }
// });

// // End point generate text from file

// app.post(
//   "/generate-from-document",

//   upload.single("document"),

//   async (req, res) => {
//     const { prompt = "Describe this uploaded document." } = req.body;

//     try {
//       const filePath = req.file.path;

//       const buffer = fs.readFileSync(filePath);

//       const base64Data = buffer.toString("base64");

//       const mimeType = req.file.mimetype;

//       const documentPart = {
//         inlineData: { data: base64Data, mimeType },
//       };

//       const result = await ai.models.generateContent({
//         model: "gemini-2.5-flash",

//         contents: [createUserContent([prompt, documentPart])],
//       });

//       res.json({ output: result.text });
//     } catch (error) {
//       console.log(error);

//       res.status(500).json({
//         success: false,

//         data: null,

//         message: e.message || "Ada masalah di server",
//       });
//     } finally {
//       fs.unlinkSync(req.file.path);
//     }
//   }
// );

// // End point generate text from audio

// app.post("/generate-from-audio", upload.single("audio"), async (req, res) => {
//   const { prompt = "Describe this uploaded audio." } = req.body;

//   try {
//     const audioBuffer = fs.readFileSync(req.file.path);

//     const base64Audio = audioBuffer.toString("base64");

//     const mimeType = req.file.mimetype;

//     const audioPart = {
//       inlineData: { data: base64Audio, mimeType },
//     };

//     const result = await ai.models.generateContent({
//       model: "gemini-2.5-flash",

//       contents: [createUserContent([prompt, audioPart])],
//     });

//     res.json({ output: result.text });
//   } catch (error) {
//     console.log(error);

//     res.status(500).json({
//       success: false,

//       data: null,

//       message: error.message || "Ada masalah di server",
//     });
//   } finally {
//     fs.unlinkSync(req.file.path);
//   }
// });

// // Menjalankan server PORT

// const PORT = process.env.PORT;

// app.listen(PORT, () => {
//   console.log(`Server berjalan dalam port ${PORT}`);
// });
