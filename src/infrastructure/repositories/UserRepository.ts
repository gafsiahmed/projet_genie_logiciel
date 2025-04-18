import { ObjectId } from "mongodb";
import { User } from "../../domain/entities/User";
import UserModel, { IUser } from "../../models/User";

export class UserRepository {
  async findAll(): Promise<User[]> {
    const users = await UserModel.find().lean();
    return users.map(user => new User({
      id: user._id as ObjectId,
      firstName: user.firstName as string,
      lastName: user.lastName as string,
      email: user.email as string,
      password: user.password as string,
      role: user.role as string,
      phoneNumber: user.phoneNumber as number
    }));
  }

  async findById(id: string | ObjectId): Promise<User | null> {
    const user = await UserModel.findById(id).lean();
    if (!user) {
      throw new Error("User not found");
    }
    
    return new User({
      id: user._id as ObjectId,
      firstName: user.firstName as string,
      lastName: user.lastName as string,
      email: user.email as string,
      password: user.password as string,
      role: user.role as string,
      phoneNumber: user.phoneNumber as number
    });
  }

  async create(user: User): Promise<User> {
    const userData = user.toModel();
    const created = await UserModel.create(userData);
    
    if (!created) {
      throw new Error("User not created");
    }

    const createdDoc = created.toObject();
    return new User({
      id: createdDoc._id as ObjectId,
      firstName: createdDoc.firstName as string,
      lastName: createdDoc.lastName as string,
      email: createdDoc.email as string,
      password: createdDoc.password as string,
      role: createdDoc.role as string,
      phoneNumber: createdDoc.phoneNumber as number
    });
  }

  async update(id: string | ObjectId, userData: Partial<IUser>): Promise<User | null> {
    const updated = await UserModel.findByIdAndUpdate(
      id,
      userData,
      { new: true }
    ).lean();
    
    if (!updated) {
      return null;
    }

    return new User({
      id: updated._id as ObjectId,
      firstName: updated.firstName as string,
      lastName: updated.lastName as string,
      email: updated.email as string,
      password: updated.password as string,
      role: updated.role as string,
      phoneNumber: updated.phoneNumber as number
    });
  }

  async delete(id: string | ObjectId): Promise<boolean> {
    const result = await UserModel.findByIdAndDelete(id);
    return result !== null;
  }
}