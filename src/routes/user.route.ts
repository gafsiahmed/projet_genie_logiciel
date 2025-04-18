import express from "express";
import { UserController } from "../presentation/controllers/UserController";
import { checkUserDoesNotExist } from "../middleware/user.middleware";

const router = express.Router();
const userController = new UserController();

// get all users
router.get("/", userController.getAllUsers);
// get user by id
router.get("/:id", userController.getUserById);
// create new user
router.post("/", checkUserDoesNotExist, userController.createUser);
// update existing user (changed from POST to PUT)
router.put("/:id", userController.updateUser);
// delete a user by id
router.delete("/:id", userController.deleteUser);

export default router;
