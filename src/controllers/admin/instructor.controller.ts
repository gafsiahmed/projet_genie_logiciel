import { Request, Response } from "express";
import {
  addInstructor,
  deleteInstructors,
  getInstructor,
  getInstructors,
  updateInstructors,
} from "../../services/instructor.services";
import {
  instructorValidation,
  instructorValidationForUpdate,
} from "../../validation/instructor.validation";

// create  a Instructor
export const createInstructor = async (req: Request, res: Response) => {
  try {
    const { error, value } = instructorValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const instructor = await addInstructor(value);
    res.status(201).send(instructor);
  } catch (error) {
    res.status(500).json(error);
  }
};
//get all Instructor

export const getInstrucotor = async (req: Request, res: Response) => {
  try {
    const instructor = await getInstructors();
    res.status(200).json(instructor);
  } catch (error) {
    res.status(500).json(error);
  }
};

//  get instructor by id

export const getInstructorById = async (req: Request, res: Response) => {
  try {
    const instructor = await getInstructor(req.params.id);
    res.status(200).json(instructor);
  } catch (error) {
    res.status(500).json(error);
  }
};

// update  instructor
export const updateInstructor = async (req: Request, res: Response) => {
  try {
    const { error, value } = instructorValidationForUpdate.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const Updatedinstructor = await updateInstructors(req.params.id, value);

    if (!Updatedinstructor) {
      return res.status(404).json({ message: "instructor not found" });
    }
    res.status(200).json(Updatedinstructor);
  } catch (error) {
    res.status(500).json(error);
  }
};

// delete instructor
export const deleteInstructor = async (req: Request, res: Response) => {
  try {
    const deletedInstructor = await deleteInstructors(req.params.id);
    if (!deletedInstructor) {
      return res.status(404).json({ message: "instructor not found" });
    }
    res.status(200).json(deletedInstructor);
  } catch (error) {
    res.status(500).json(error);
  }
};
