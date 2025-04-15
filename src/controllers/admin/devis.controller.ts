import { Request, Response } from "express";
import Devis from "../../models/Devis";
import { devisValidation } from "../../validation/devis.validations";
import { documentValidation } from "../../validation/document.validation";

// create devis
export const createDevis = async (req: Request, res: Response) => {
  try {
    const { error, value } = documentValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const devis = new Devis(value);
    await devis.save();
    res.status(201).send(devis);
  } catch (error) {
    res.status(500).json(error);
  }
};

// get all devis

export const getDevis = async (req: Request, res: Response) => {
  try {
    const devis = await Devis.find();
    res.status(200).json(devis);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Update devis
export const updateDevis = async (req: Request, res: Response) => {
  try {
    const devis = await Devis.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res.status(200).json(devis);
  } catch (error) {
    res.status(500).json(error);
  }
};
// delete devis
export const deleteDevis = async (req: Request, res: Response) => {
  try {
    const devis = await Devis.findByIdAndDelete(req.params.id);
    res.status(200).json(devis);
  } catch (error) {
    res.status(500).json(error);
  }
};
