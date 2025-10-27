import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(data: Partial<User>): Promise<User> {
    const created = new this.userModel(data);
    return created.save();
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async findById(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }

  async findAllExcept(userId: string): Promise<User[]> {
    return this.userModel
      .find({ _id: { $ne: userId } })
      .select('-password')
      .exec();
  }

  async updatePassword(userId: string, newPassword: string) {
    return this.userModel.findByIdAndUpdate(userId, { password: newPassword });
  }
}
