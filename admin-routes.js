import express from 'express';
import { addAdmin, adminLogin, getAdmins, getAdminById } from "../controllers/admin-controller.js";

const adminRouter = express.Router();

adminRouter.post("/signup", addAdmin);
adminRouter.post("/login", adminLogin);
adminRouter.get("/", getAdmins);
adminRouter.get("/:id", getAdminById); // Ensure getAdminById is correctly imported from admin-controller.js

export default adminRouter;

