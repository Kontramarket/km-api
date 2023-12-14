import { Injectable } from '@nestjs/common';
import {
  CreateUserGroupDto,
  UpdateUserGroupDto,
  UserGroup,
} from './user-group.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserGroupService {
  constructor(
    @InjectModel('user-group')
    private readonly userGroupModel: Model<UserGroup>,
  ) {}
  async create(createUserGroupDto: CreateUserGroupDto) {
    const newUserGroup = new this.userGroupModel(createUserGroupDto);
    await newUserGroup.save();
    return await this.userGroupModel.find().populate('parentGroup');
  }

  async findAll() {
    return await this.userGroupModel.find().populate('parentGroup');
  }

  async findOne(id: string) {
    return await this.userGroupModel.findById(id);
  }

  async update(id: string, updateUserGroupDto: UpdateUserGroupDto) {
    await this.userGroupModel.findOneAndUpdate({ _id: id }, updateUserGroupDto);
    return await this.userGroupModel.find().populate('parentGroup');
  }
}
