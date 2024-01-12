import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.model';
import * as bcrypt from 'bcrypt';
import { UserGroup } from 'src/user-group/user-group.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('user') private readonly userModel: Model<User>,
    @InjectModel('user-group') private readonly userGroups: Model<UserGroup>,
  ) {}

  async getByUsername(username: string) {
    return this.userModel.findOne({ username });
  }
  async getByEmail(email: string) {
    return this.userModel.findOne({ email });
  }
  async getByUserId(id: string) {
    return this.userModel.findById(id);
  }
  async create(
    username: string,
    email: string,
    password: string,
    permissionLevel: number,
  ) {
    // if (1 < permissionLevel && permissionLevel < 2) {
    //   throw new HttpException(
    //     'User type incorrect',
    //     HttpStatus.INTERNAL_SERVER_ERROR,
    //   );
    // }
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    const newUser = new this.userModel({
      username,
      email,
      password: hashedPassword,
      permissionLevel,
    });
    await newUser.save();
    return newUser;
  }
  async createPasswordResetUrl(id: string) {
    const hash = await bcrypt.genSalt(20);
    await this.userModel.findByIdAndUpdate(id, {
      password: hash,
    });
    return (
      'https://kontramarket-corporate-8d31bf3141fd.herokuapp.com/reset-password?token=' +
      hash
    );
  }
  async passwordRecovery(token: string, newPassword: string) {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltOrRounds);
    await this.userModel.findOneAndUpdate(
      { password: token },
      {
        password: hashedPassword,
      },
    );
    return { status: true };
  }
  async getAdmins() {
    const allAdmins = [];
    const admins = await this.userModel.find({ permissionLevel: 0 });
    admins.forEach((admin) => {
      allAdmins.push(admin);
    });
    const elevatedAdminGroups = await this.userGroups.find({
      parentGroup: await this.userGroups.findById('659489598dd4899f1add104d'),
    });
    elevatedAdminGroups.forEach(async (group) => {
      const userGroupAdmin = await this.userModel.find({
        permissionLevel: group._id,
      });
      userGroupAdmin.forEach((user) => {
        allAdmins.push(user);
      });
    });
    return allAdmins;
  }
  async setStatus(id: string, online: boolean) {
    return await this.userModel.findByIdAndUpdate(id, { online: online });
  }
}
