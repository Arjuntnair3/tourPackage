import express from "express";
import { createPDF } from "../controllers/pdf-controller.js";

const pdfRouter = express.Router();

pdfRouter.get("/", createPDF);

export default pdfRouter;
