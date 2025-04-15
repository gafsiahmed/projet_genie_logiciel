import express from "express";
import {
  createUser,
  deleteUserById,
  getAllUsers,
  getUserById,
  updateUserById,
} from "../controllers/user.controller";
import { accessByRole } from "../middleware/auth.middleware";
import { checkUserDoesNotExist } from "../middleware/user.middleware";
const router = express.Router();

// get all users
router.get("/", accessByRole(["admin"]), getAllUsers);
//get user by id
router.get("/:id", accessByRole(["admin"]), getUserById);
//create new user
router.post("/", accessByRole(["admin"]), checkUserDoesNotExist, createUser);
//update exisiting user
router.post("/:id", accessByRole(["admin"]), updateUserById);
//delete a user by his id
router.delete("/:id", accessByRole(["admin"]), deleteUserById);
//get logged user

export default router;
