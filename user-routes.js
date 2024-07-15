import express from "express";
import { deleteUser, getAllUsers, getBookingsOfUser, login, Signup, updateUser } from "../controllers/user-controller.js";

const userRouter = express.Router();

userRouter.get("/", getAllUsers);
userRouter.post("/signup", Signup);
userRouter.put("/:id", updateUser);
userRouter.delete("/:id", deleteUser);
userRouter.post("/login", login); // Ensure this is defined correctly
userRouter.get("/bookings/:id", getBookingsOfUser);

export default userRouter;
