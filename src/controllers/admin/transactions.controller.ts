import { Request, Response } from "express";
import Student from "../../models/Student";
import Transaction from "../../models/Transaction";
import { transactionValidation } from "../../validation/transactions.validations";

export const createTransaction = async (req: Request, res: Response) => {
  try {
    const { error, value } = transactionValidation.validate(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message });

    const transaction = new Transaction(value);
    await transaction.save();

    res.status(201).send(transaction);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const getTransactions = async (req: Request, res: Response) => {
  try {
    const transaction = await Transaction.find();
    if (transaction) {
      res.status(200).json(transaction);
    } else {
      res.status(404).json({ message: "Transactions not found" });
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

export const getTransactionById = async (req: Request, res: Response) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (transaction) {
      res.status(200).json(transaction);
    } else {
      res.status(404).json({ message: "Transaction not found" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

export const deleteTransactionById = async (req: Request, res: Response) => {
  try {
    const transaction = await Transaction.findByIdAndDelete(req.params.id);
    if (transaction) {
      res.status(200).json({ message: "Transaction deleted successfully" });
    } else {
      res.status(404).json({ message: "Transaction not found" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

export const updateTransactionById = async (req: Request, res: Response) => {
  try {
    const { error, value } = transactionValidation.validate(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message });

    const transaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      value,
      { new: true }
    );
    const targetedTransaction = await Transaction.findById(req.params.id);
    const studentId = targetedTransaction?.student;
    // find the student with the id of the transaction.student and update the student payment with the new amount from the req.body
    const student = await Student.findByIdAndUpdate(studentId, {
      $set: { payment: value.amount },
    });

    if (transaction) {
      res.status(200).json(transaction);
    } else {
      res.status(404).json({ message: "Transaction not found" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
