import { ObjectId } from "mongodb";
import { Devis } from "../../domain/entities/Devis";
import { DevisRepository } from "../../infrastructure/repositories/DevisRepository";

export class DevisService {
  constructor(private repository: DevisRepository) {}

  async getDevis(): Promise<Devis[]> {
    return await this.repository.findAll();
  }

  async getDevisById(id: string | ObjectId): Promise<Devis | null> {
    return await this.repository.findById(id);
  }

  async createDevis(data: { code: string; validetDate: Date }): Promise<Devis> {
    const devis = new Devis(null, data.code, new Date(data.validetDate));

    if (!devis.validate()) {
      throw new Error("Invalid devis data");
    }

    return await this.repository.create(devis);
  }

  async updateDevis(id: string | ObjectId, data: any): Promise<Devis | null> {
    return await this.repository.update(id, data);
  }

  async deleteDevis(id: string | ObjectId): Promise<boolean> {
    return await this.repository.delete(id);
  }
}
