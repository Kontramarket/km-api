import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import {
  CreateUserAttributeDto,
  UserAttribute,
  UpdateUserAttributeDto,
} from './user-attribute.model';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserAttributeService {
  constructor(
    @InjectModel('user-attribute')
    private readonly userAttributeModel: Model<UserAttribute>,
  ) {}
  async create(createUserAttributeDto: CreateUserAttributeDto, userId: string) {
    const newUserAttribute = new this.userAttributeModel({
      ...createUserAttributeDto,
      change: userId,
    });
    await newUserAttribute.save();
    return await this.userAttributeModel.find({
      groupId: createUserAttributeDto.groupId,
    });
  }

  async findAll() {
    return await this.userAttributeModel.find();
  }

  async findOne(id: string) {
    return await this.userAttributeModel.find({ groupId: id });
  }

  async update(
    id: string,
    updateUserAttributeDto: UpdateUserAttributeDto,
    userId: string,
  ) {
    const attib = await this.userAttributeModel.findByIdAndUpdate(
      { _id: id },
      { ...updateUserAttributeDto, change: userId },
    );
    return await this.userAttributeModel.find({ groupId: attib.groupId });
  }

  async remove(id: string, userId: string) {
    return await this.userAttributeModel.findOneAndUpdate(
      { id },
      { hidden: true, change: userId },
    );
  }
}
