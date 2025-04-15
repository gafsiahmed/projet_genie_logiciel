import { Request, Response } from "express";
import Training from "../../models/Training";
import { trainingValidation } from "../../validation/training.validation";

// create a training object

export const createTraining = async (req: Request, res: Response) => {
  try {
    const { error, value } = trainingValidation.validate(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    const training = new Training(value);
    await training.save();
    res.status(201).send(training);
  } catch (err) {
    res.status(500).send(err);
  }
};

// get all trainings

export const getTrainings = async (req: Request, res: Response) => {
  try {
    const training = await Training.find();
    res.status(200).json(training);
  } catch (err) {
    res.status(500).json(err);
  }
};

//get traing by id

//update a training

//delete a training
