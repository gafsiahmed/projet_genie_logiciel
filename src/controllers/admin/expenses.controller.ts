import { Request, Response } from "express";
import Expenses from "../../models/expenses";
import { ExpensesValidation } from "../../validation/expenses.validation";

export const createExpenses = async (req: Request, res: Response) => {
  try {
    const { error, value } = ExpensesValidation.validate(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message });

    const expenses = new Expenses(value);

    await expenses.save();
    res.status(201).send(expenses);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const getExpenses = async (req: Request, res: Response) => {
  try {
    const expenses = await Expenses.find();
    if (expenses) {
      res.status(200).json(expenses);
    } else {
      res.status(404).json({ message: "Expenses not found" });
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

export const getExpensesById = async (req: Request, res: Response) => {
  try {
    const expenses = await Expenses.findById(req.params.id);
    if (expenses) {
      res.status(200).json(expenses);
    } else {
      res.status(404).json({ message: "Expenses not found" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

export const deleteExpensesById = async (req: Request, res: Response) => {
  try {
    const expenses = await Expenses.findByIdAndDelete(req.params.id);
    if (expenses) {
      res.status(200).json({ message: "Expenses deleted successfully" });
    } else {
      res.status(404).json({ message: "Expenses not found" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

export const updateExpensesById = async (req: Request, res: Response) => {
  try {
    const expenses = await Expenses.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (expenses) {
      res.status(200).json(expenses);
    } else {
      res.status(404).json({ message: "Expenses not found" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
