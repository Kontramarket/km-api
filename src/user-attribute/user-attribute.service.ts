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
  async create(createUserAttributeDto: CreateUserAttributeDto) {
    const newUserAttribute = new this.userAttributeModel(
      createUserAttributeDto,
    );
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

  async update(id: string, updateUserAttributeDto: UpdateUserAttributeDto) {
    const attib = await this.userAttributeModel.findByIdAndUpdate(
      { _id: id },
      updateUserAttributeDto,
    );
    return await this.userAttributeModel.find({ groupId: attib.groupId });
  }

  async remove(id: string) {
    return await this.userAttributeModel.findOneAndUpdate(
      { id },
      { hidden: true },
    );
  }
}
