import { Request, Response } from "express";
import Incomes from "../../models/Incomes";
import Student, { IStudent } from "../../models/Student";
import { studentValidation } from "../../validation/student.validation";

// create  a student
export const createStudent = async (req: Request, res: Response) => {
  try {
    const { error, value } = studentValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const newValues = {
      ...value,
      paymentStatus:
        value.payment === 500
          ? "Paid"
          : value.payment > 10
          ? "Pending"
          : "Not Paid",
    };

    const student = new Student(newValues);
    await student.save();
    const studentId = student._id;
    const studentData = value as IStudent;
    // get todays date
    const today = new Date();
    const date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    //i want to create a transaction based on the student data

    const transaction = new Incomes({
      date: date,
      student: studentId,
      amount: studentData.payment,
      description: "paiement de la formation",
      from: studentData.firstName + " " + studentData.lastName,
      category: "TrainingPayment",
      paymentType: "cash",
      __t: "Revenu",
    });
    const newIncome = new Incomes(transaction);
    await newIncome.save();

    res.status(201).send(student);
  } catch (error) {
    res.status(500).json(error);
  }
};
//get all students

export const getStudents = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 4;

    if (!req.query.page || !req.query.limit) {
      const students = await Student.find()

        .populate("trainingSession")
        
        .populate({
          path: "trainingSession",
          populate: {
            path: "training", 
          },
        })
        .populate({
          path: "trainingSession",
          populate: {
            path: "instructor",

            
          },
        });
      return res.status(200).json(students);
    }

    const students = await Student.find()
      .populate("trainingSession")
      .populate({
        path: "trainingSession",
        populate: {
          path: "training",
        },
      })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    const count = await Student.countDocuments();

    res.status(200).json({
      students,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

//  get student by id

export const getStudentById = async (req: Request, res: Response) => {
  try {
    const student = await Student.findById(req.params.id);
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json(error);
  }
};

// update  student
export const updateStudent = async (req: Request, res: Response) => {
  try {
    const { error, value } = studentValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // get the income where the student is equal to the student id then update the amount of the income with the new amount from value.payment
    const StudentIncomeFromPayment = await Incomes.findOneAndUpdate(
      { student: req.params.id },
      { amount: value.payment }
    );

    console.log(
      StudentIncomeFromPayment,
      "here is the student income from payment"
    );

    // update the payment status
    const newValues = {
      ...value,
      paymentStatus:
        value.payment === 500
          ? "Paid"
          : value.payment > 10
          ? "Pending"
          : "Not Paid",
    };

    console.log(
      newValues,
      "here is the new values of the student after updating"
    );

    const student = await Student.findByIdAndUpdate(req.params.id, {
      $set: newValues,
    });
    console.log(
      student,
      "here is the student after updating ----------------------------- done updating student ----------------------------"
    );

    res.status(200).json(student);
  } catch (error) {
    res.status(500).json(error);
  }
};

// delete student
export const deleteStudent = async (req: Request, res: Response) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json(error);
  }
};
