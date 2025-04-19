import { ObjectId } from "mongodb";
import { Devis } from "../../domain/entities/Devis";
import DevisModel from "../../models/Devis";

export class DevisRepository {
  async findAll(): Promise<Devis[]> {
    const models = await DevisModel.find();
    return models.map(Devis.fromModel);
  }

  async findById(id: string | ObjectId): Promise<Devis | null> {
    const model = await DevisModel.findById(id);
    return model ? Devis.fromModel(model) : null;
  }

  async create(devis: Devis): Promise<Devis> {
    const model = new DevisModel(devis.toModel());
    const saved = await model.save();
    return Devis.fromModel(saved);
  }

  async update(id: string | ObjectId, data: any): Promise<Devis | null> {
    const updated = await DevisModel.findByIdAndUpdate(id, data, { new: true });
    return updated ? Devis.fromModel(updated) : null;
  }

  async delete(id: string | ObjectId): Promise<boolean> {
    const result = await DevisModel.findByIdAndDelete(id);
    return !!result;
  }
}
