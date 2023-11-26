import { ForbiddenException, Injectable } from '@nestjs/common';
import { Admin, RegisterAdminDto, UpdateAdminDto } from './admin.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/user.model';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel('admin') private readonly adminModel: Model<Admin>,
    @InjectModel('user') private readonly userModel: Model<User>,
  ) {}
  async create(registerAdminDto: RegisterAdminDto) {
    if (!(await this.userModel.findById(registerAdminDto.userId))) {
      throw new ForbiddenException();
    }
    const newAdmin = new this.adminModel(registerAdminDto);
    await newAdmin.save();
    return newAdmin;
  }

  async findAll() {
    return await this.adminModel.findOne();
  }

  async findOne(userId: string) {
    return await this.adminModel.findOne({ userId });
  }

  async update(userId: string, updateAdminDto: UpdateAdminDto) {
    return await this.adminModel.updateOne({ userId }, updateAdminDto);
  }
}
