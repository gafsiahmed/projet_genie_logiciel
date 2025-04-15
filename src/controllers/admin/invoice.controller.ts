import { Request, Response } from "express";

import { invoiceValidation } from "../../validation/invoice.validation";
import { documentValidation } from "../../validation/document.validation";
import Facture from "../../models/Facture";

// create invoice
export const createInvoices = async (req: Request, res: Response) => {
  try {
    const { error, value } =  documentValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const invoice = new Facture(value);
    await invoice.save();
    res.status(201).send(invoice);
  } catch (error) {
    res.status(500).json(error);
  }
};

// get all invoices

export const getInvoices = async (req: Request, res: Response) => {
  try {
    const invoices = await Facture.find();
    res.status(200).json(invoices);
  } catch (error) {
    res.status(500).json(error);
  }
};

//
export const updateInvoives = async (req: Request, res: Response) => {
  try {
    const invoice = await Facture.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res.status(200).json(invoice);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteInvoice = async (req: Request, res: Response) => {
  try {
    const instructor = await Facture.findByIdAndDelete(req.params.id);
    res.status(200).json(instructor);
  } catch (error) {
    res.status(500).json(error);
  }
};
