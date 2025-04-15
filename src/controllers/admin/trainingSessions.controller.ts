import { Request, Response } from "express";

import Instructor from "../../models/Instructor";
import TrainingSession from "../../models/TrainingSession";
import { trainingSessionValidation } from "../../validation/trainingSessions.validation";

//----------------------------------------------------//
// create a training session object ✅
//----------------------------------------------------//

export const createTrainingSession = async (req: Request, res: Response) => {
  try {
    const { error, value } = trainingSessionValidation.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const trainingSession = new TrainingSession(value);

    await trainingSession.save();
    res.status(201).send(trainingSession);
  } catch (err) {
    res.status(500).send(err);
  }
};
//----------------------------------------------------//
// get all training sessions ✅
//----------------------------------------------------//

export const getTrainingSessions = async (req: Request, res: Response) => {
  try {
    const trainingSession = await TrainingSession.find()
      .populate("students")
      .populate("instructor")
      .populate("training");
    res.status(200).json(trainingSession);
  } catch (err) {
    res.status(500).json(err);
  }
};

//----------------------------------------------------//
// get training sessions by instructor id  ✅
//----------------------------------------------------//

export const getTrainingSessionsByInstructorId = async (
  req: Request,
  res: Response
) => {
  const email = req.body.email as string;

  try {
    const instructorId = await Instructor.findOne({ email: email });

    const trainingSession = await TrainingSession.find({
      instructor: instructorId,
    })
      .populate("students")
      .populate("instructor")
      .populate("training");
    if (!trainingSession)
      return res
        .status(404)
        .send("No training sessions found for this instructor");

    return res.status(200).json(trainingSession);
  } catch (err) {
    res.status(500).json(err);
  }
};

//----------------------------------------------------//
// get training session by id ✅
//----------------------------------------------------//

export const getTrainingSessionById = async (req: Request, res: Response) => {
  try {
    const trainingSession = await TrainingSession.findById(req.params.id);
    res.status(200).json(trainingSession);
  } catch (err) {
    res.status(500).json(err);
  }
};
//----------------------------------------------------//
// update training session ✅
//----------------------------------------------------//

export const updateTrainingSession = async (req: Request, res: Response) => {
  try {
    const { error, value } = trainingSessionValidation.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const trainingSession = await TrainingSession.findByIdAndUpdate(
      req.params.id,
      value
    );
    res.status(200).json(trainingSession);
  } catch (err) {
    res.status(500).json(err);
  }
};
//----------------------------------------------------//
// delete training session ✅
//----------------------------------------------------//

export const deleteTrainingSession = async (req: Request, res: Response) => {
  try {
    const trainingSession = await TrainingSession.findByIdAndDelete(
      req.params.id
    );
    res.status(200).json(trainingSession);
  } catch (err) {
    res.status(500).json(err);
  }
};
//----------------------------------------------------//
