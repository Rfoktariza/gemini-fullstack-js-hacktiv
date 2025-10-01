import { createPartFromUri, createUserContent } from "@google/genai";
import fs from "fs";

const handleApiError = (res, error) => {
  console.log(error);
  const errorMessage = error.message || "Ada masalah di server";

  res.status(500).json({
    success: false,
    data: null,
    message: errorMessage,
  });
};

const generateContentResponse = async (
  ai,
  res,
  contents,
  successMessage = "Berhasil diresponse oleh AI Flash"
) => {
  try {
    const aiResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: contents,
    });

    res.status(200).json({
      success: true,
      data: aiResponse.text,
      message: successMessage,
    });
  } catch (error) {
    handleApiError(res, error);
  }
};

const createInlineDataPart = (filePath, mimeType) => {
  const buffer = fs.readFileSync(filePath);
  const base64Data = buffer.toString("base64");
  return {
    inlineData: { data: base64Data, mimeType },
  };
};

// Controller Handler

// Handler untuk /chat
export const chatHandler = (ai) => async (req, res) => {
  const { prompt } = req.body;

  if (!prompt || typeof prompt !== "string") {
    return res.status(400).json({
      message: "Prompt harus di isi dan berupa string!",
      data: null,
      success: false,
    });
  }

  const contents = [
    {
      parts: [{ text: prompt }],
    },
  ];

  await generateContentResponse(ai, res, contents);
};

// Handler untuk /generate-from-image
export const imageHandler = (ai) => async (req, res) => {
  const { prompt = "Describe this uploaded image." } = req.body;

  if (!req.file) {
    return res.status(400).json({ message: "File 'image' harus diupload." });
  }

  const filePath = req.file.path;

  try {
    const image = await ai.files.upload({
      file: filePath,
      config: {
        mimeType: req.file.mimetype,
      },
    });

    const contents = [
      createUserContent([prompt, createPartFromUri(image.uri, image.mimeType)]),
    ];

    await generateContentResponse(
      ai,
      res,
      contents,
      "Berhasil analisis gambar oleh AI Flash"
    );
  } catch (error) {
    handleApiError(res, error);
  } finally {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }
};

// Handler untuk /generate-from-document
export const documentHandler = (ai) => async (req, res) => {
  const { prompt = "Describe this uploaded document." } = req.body;

  if (!req.file) {
    return res.status(400).json({ message: "File 'document' harus diupload." });
  }

  const filePath = req.file.path;

  try {
    const documentPart = createInlineDataPart(filePath, req.file.mimetype);
    const contents = [createUserContent([prompt, documentPart])];

    await generateContentResponse(
      ai,
      res,
      contents,
      "Berhasil analisis dokumen oleh AI Flash"
    );
  } catch (error) {
    handleApiError(res, error);
  } finally {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }
};

// Handler untuk /generate-from-audio
export const audioHandler = (ai) => async (req, res) => {
  const { prompt = "Describe this uploaded audio." } = req.body;

  if (!req.file) {
    return res.status(400).json({ message: "File 'audio' harus diupload." });
  }

  const filePath = req.file.path;

  try {
    const audioPart = createInlineDataPart(filePath, req.file.mimetype);
    const contents = [createUserContent([prompt, audioPart])];

    await generateContentResponse(
      ai,
      res,
      contents,
      "Berhasil analisis audio oleh AI Flash"
    );
  } catch (error) {
    handleApiError(res, error);
  } finally {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }
};
