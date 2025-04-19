import { Request, Response } from "express";
import { DevisService } from "../../application/services/DevisService";
import { DevisRepository } from "../../infrastructure/repositories/DevisRepository";
import { documentValidation } from "../../validation/document.validation";
import { BaseController } from "./BaseController";

export class DevisController extends BaseController {
  private devisService: DevisService;

  constructor() {
    super();
    const repository = new DevisRepository();
    this.devisService = new DevisService(repository);

    this.createDevis = this.createDevis.bind(this);
    this.getDevis = this.getDevis.bind(this);
    this.updateDevis = this.updateDevis.bind(this);
    this.deleteDevis = this.deleteDevis.bind(this);
  }

  async createDevis(req: Request, res: Response): Promise<Response> {
    try {
      const { error, value } = documentValidation.validate(req.body);
      if (error) return this.sendBadRequest(res, error.details[0].message);

      const devis = await this.devisService.createDevis(value);
      return this.sendSuccess(res, devis, 201);
    } catch (err) {
      return this.sendError(res, err);
    }
  }

  async getDevis(req: Request, res: Response): Promise<Response> {
    try {
      const devis = await this.devisService.getDevis();
      return this.sendSuccess(res, devis);
    } catch (err) {
      return this.sendError(res, err);
    }
  }

  async updateDevis(req: Request, res: Response): Promise<Response> {
    try {
      const devis = await this.devisService.updateDevis(req.params.id, req.body);
      return this.sendSuccess(res, devis);
    } catch (err) {
      return this.sendError(res, err);
    }
  }

  async deleteDevis(req: Request, res: Response): Promise<Response> {
    try {
      const success = await this.devisService.deleteDevis(req.params.id);
      if (!success) return this.sendNotFound(res, "Devis not found");
      return this.sendSuccess(res, { message: "Devis deleted successfully" });
    } catch (err) {
      return this.sendError(res, err);
    }
  }
}
