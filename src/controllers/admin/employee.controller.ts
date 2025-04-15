import { Request, Response } from "express";
import Employee from "../../models/Employee";
import { employeeValidation } from "../../validation/employee.validation";
// create  a employee
export const createEmployee = async (req: Request, res: Response) => {
  try {
    const { error, value } = await employeeValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const employee = new Employee(value);
    await employee.save();
    res.status(201).send(employee);
  } catch (error) {
    res.status(500).json(error);
  }
};
//get all employee

export const getEmployee = async (req: Request, res: Response) => {
  try {
    const employee = await Employee.find();
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json(error);
  }
};

//  get employee by id

export const getEmployeeById = async (req: Request, res: Response) => {
  try {
    const employee = await Employee.findById(req.params.id);
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json(error);
  }
};

// update  employee
export const updateEmployee = async (req: Request, res: Response) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json(error);
  }
};

// delete employee
export const deleteEmployee = async (req: Request, res: Response) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json(error);
  }
};
