import express from 'express';
import { addPackage, getAllpackagess, getPackageById } from '../controllers/package-controller.js';
const packageRouter = express.Router();

packageRouter.get("/", getAllpackagess);
packageRouter.get("/:id", getPackageById);
packageRouter.post("/", addPackage); // Ensure this route is correct

export default packageRouter;
