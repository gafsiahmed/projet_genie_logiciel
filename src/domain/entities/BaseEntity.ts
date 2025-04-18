import { ObjectId } from "mongodb";

export abstract class BaseEntity {
  protected id: ObjectId;
  
  constructor(id?: ObjectId) {
    this.id = id || new ObjectId();
  }
  
  public getId(): ObjectId {
    return this.id;
  }
}