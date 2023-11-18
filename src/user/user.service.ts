import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.model';
import * as bcrypt from 'bcrypt';
import { ExternalExceptionFilter } from '@nestjs/core/exceptions/external-exception-filter';

@Injectable()
export class UserService {
  constructor(@InjectModel('user') private readonly userModel: Model<User>) {}

  async getByUsername(username: string) {
    return this.userModel.findOne({ username });
  }

  async create(
    email: string,
    password: string,
    permissionLevel: number,
    firstName: string,
    lastName: string,
    dob: string,
    username: string,
    mb: number,
    address: string,
    zip: number,
    website: string,
    avatar: string,
    targetGroups: string,
    phoneNumber: string,
  ) {
    if (1 < permissionLevel && permissionLevel < 2) {
      throw new ExternalExceptionFilter();
    }
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    const newUser = new this.userModel({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      permissionLevel,
      dob,
      username,
      mb,
      address,
      zip,
      website,
      avatar,
      targetGroups,
      phoneNumber,
    });
    await newUser.save();
    return newUser;
  }
}
