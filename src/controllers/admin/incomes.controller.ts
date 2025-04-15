import { Request, Response } from "express";
import Incomes from "../../models/Incomes";
import Student from "../../models/Student";
import Transactions from "../../models/Transaction";
import { IncomesValidation } from "../../validation/incomes.validation";

export const createIncome = async (req: Request, res: Response) => {
  try {
    const { error, value } = IncomesValidation.validate(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message });
    const income = new Incomes(value);
    await income.save();
    res.status(201).send(income);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const getIncomes = async (req: Request, res: Response) => {
  try {
    const income = await Incomes.find();
    if (income) {
      res.status(200).json(income);
    } else {
      res.status(404).json({ message: "Incomes not found" });
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

export const getIncomeById = async (req: Request, res: Response) => {
  try {
    const income = await Incomes.findById(req.params.id);
    if (income) {
      res.status(200).json(income);
    } else {
      res.status(404).json({ message: "Incomes not found" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

export const deleteIncomeById = async (req: Request, res: Response) => {
  try {
    const income = await Incomes.findByIdAndDelete(req.params.id);
    if (income) {
      res.status(200).json({ message: "Incomes deleted successfully" });
    } else {
      res.status(404).json({ message: "Incomes not found" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

export const updateIncomeById = async (req: Request, res: Response) => {
  try {
    const { error, value } = IncomesValidation.validate(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message });
    const income = await Incomes.findByIdAndUpdate(req.params.id, value, {
      new: true,
    });
    const targetedTransaction = await Transactions.findById(req.params.id);
    const studentId = targetedTransaction?.student;
    // find the student with the id of the transaction.student and update the student payment with the new amount from the req.body
    const student = await Student.findByIdAndUpdate(studentId, {
      $set: { payment: value.amount },
    });

    console.log("this is the updated student : ", student);

  
    if (income) {
      res.status(200).json(income);
    } else {
      res.status(404).json({ message: "Incomes not found" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
