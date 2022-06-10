import express from "express";
import {
  deleteUser,
  editUserProfile,
  getAllUsers,
  login,
  register,
} from "./userControllers.js";

const router = express.Router();

router.route("").get(getAllUsers).post(register);

router.route("/:id").put(editUserProfile).delete(deleteUser);

router.post("/login", login);

export default router;
