import express from "express";
import { isAuthenticated } from "./authMiddleware.js";
import {
  deleteUser,
  editUserProfile,
  getAllUsers,
  login,
  register,
} from "./userControllers.js";

const router = express.Router();

router.route("").get(getAllUsers).post(register);

router
  .route("/:id")
  .put(isAuthenticated, editUserProfile)
  .delete(isAuthenticated, deleteUser);

router.post("/login", login);

export default router;
