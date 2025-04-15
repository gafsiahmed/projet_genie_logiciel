import { Request, Response } from "express";
import Incomes from "../../models/Incomes";
// import Payments from "../../models/Payment";
import Student from "../../models/Student";
import { IncomesValidation } from "../../validation/incomes.validation";

export const createPayment = async (req: Request, res: Response) => {
  try {
    const { error, value } = IncomesValidation.validate(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message });

    const studentInfo = await Student.findById(value.student);

    const NewValues = {
      ...value,
      category: "TrainingPayment",
      from: studentInfo?.firstName + " " + studentInfo?.lastName,
    };
    const incomes = new Incomes(NewValues);

    // const payment = new Payments(value);
    // await payment.save();
    await incomes.save();
    res.status(201).send(incomes);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const getPayments = async (req: Request, res: Response) => {
  try {
    const payment = await Incomes.find({ category: "TrainingPayment" })
      //.populate("trainingSession")
      .populate("student");
    if (payment) {
      res.status(200).json(payment);
    } else {
      res.status(404).json({ message: "Payments not found" });
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

export const getPaymentById = async (req: Request, res: Response) => {
  try {
    const payment = await Incomes.findById(req.params.id);
    if (payment) {
      res.status(200).json(payment);
    } else {
      res.status(404).json({ message: "Payments not found" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

export const deletePaymentById = async (req: Request, res: Response) => {
  try {
    const DeletedPayment = await Incomes.findByIdAndDelete(req.params.id);

    if (DeletedPayment) {
      res.status(200).json({ message: "Payments deleted successfully" });
    } else {
      res.status(404).json({ message: "Payments not found" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

export const updatePaymentById = async (req: Request, res: Response) => {
  try {
    const payment = await Incomes.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (payment) {
      res.status(200).json({ message: "Payments updated successfully" });
    } else {
      res.status(404).json({ message: "Payments not found" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
