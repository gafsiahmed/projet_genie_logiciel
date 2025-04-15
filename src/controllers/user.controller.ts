import { Request, Response } from "express";
import User from "../models/User";
import {
  addUser,
  deleteUser,
  getUsers,
  updateUser,
} from "../services/user.services";
import {
  userValidation,
  userValidationForUpdate,
} from "../validation/user.validation";

//get all the users in the database ✅
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await getUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error });
  }
};

//geting user by id ✅
const getUserById = async (req: Request, res: Response) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ msg: "can't find the user" });
  }
};

//creating a user ✅
const createUser = async (req: Request, res: Response) => {
  try {
    const { error, value } = userValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const createdUser = await addUser(value);
    res.status(201).json(createdUser);
  } catch (error) {
    res.status(500).json({ error });
  }
};

//update user ✅
const updateUserById = async (req: Request, res: Response) => {
  const userId = req.params.id;
  try {
    const { error, value } = userValidationForUpdate.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const updatedUser = await updateUser(userId, value);
    if (!updateUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error });
  }
};

//delete user by his id ✅
const deleteUserById = async (req: Request, res: Response) => {
  const userId = req.params.id;
  try {
    const deletedUser = await deleteUser(userId);
    if (!deletedUser) {
      return res.status(404).json({ msg: "can't find the user" });
    }
    res
      .status(200)
      .json({ msg: "i got the user and deleted it ", user: deletedUser });
  } catch (error) {
    res.status(500).json({ msg: "can't find the user" });
  }
};

export { getAllUsers, getUserById, createUser, updateUserById, deleteUserById };
