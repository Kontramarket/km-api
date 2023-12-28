import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin } from 'src/admin/admin.model';
import { TenderAttribute } from 'src/tender-attribute/tender-attribute.model';
import { TenderGroup } from 'src/tender-group/tender-group.model';
import { Tender } from 'src/tender/tender.model';
import { UserAttribute } from 'src/user-attribute/user-attribute.model';
import { UserGroup } from 'src/user-group/user-group.model';
import { User } from 'src/user/user.model';
import { Log } from './logger.model';

@Injectable()
export class LoggerService implements OnModuleInit {
  constructor(
    @InjectModel('log') private logModel: Model<Log>,
    @InjectModel('tender-group') private tenderGroupModel: Model<TenderGroup>,
    @InjectModel('tender-attribute')
    private tenderAttributeModel: Model<TenderAttribute>,
    @InjectModel('tender') private tenderModel: Model<Tender>,
    @InjectModel('user-group') private userGroupModel: Model<UserGroup>,
    @InjectModel('user-attribute')
    private userAttributeModel: Model<UserAttribute>,
    @InjectModel('user') private userModel: Model<User>,
    @InjectModel('admin') private adminModel: Model<Admin>,
  ) {}

  onModuleInit() {
    this.tenderGroupModel.collection.watch<TenderGroup>().on('change', (e) => {
      this.createRecord(e, 'tender-group');
    });
    this.tenderAttributeModel.collection
      .watch<TenderAttribute>()
      .on('change', (e) => {
        this.createRecord(e, 'tender-attribute');
      });
    this.tenderModel.collection.watch<Tender>().on('change', (e) => {
      this.createRecord(e, 'tender');
    });
    this.userGroupModel.collection.watch<UserGroup>().on('change', (e) => {
      this.createRecord(e, 'user-group');
    });
    this.userAttributeModel.collection
      .watch<UserAttribute>()
      .on('change', (e) => {
        this.createRecord(e, 'user-attribute');
      });
    this.userModel.collection.watch<User>().on('change', (e) => {
      this.createRecord(e, 'user');
    });
    this.adminModel.collection.watch<Admin>().on('change', (e) => {
      this.createRecord(e, 'admin');
    });
  }

  async createRecord(data, model: string) {
    let oldRecord;
    switch (model) {
      case 'tender-group':
        oldRecord = await this.tenderGroupModel.findById(data.documentKey);
        break;
      case 'tender-attribute':
        oldRecord = await this.tenderAttributeModel.findById(data.documentKey);
        break;
      case 'tender':
        oldRecord = await this.tenderModel.findById(data.documentKey);
        break;
      case 'user-group':
        oldRecord = await this.userGroupModel.findById(data.documentKey);
        break;
      case 'user-attribute':
        oldRecord = await this.userAttributeModel.findById(data.documentKey);
        break;
      case 'user':
        oldRecord = await this.userModel.findById(data.documentKey);
        break;
      case 'admin':
        oldRecord = await this.adminModel.findById(data.documentKey);
        break;
    }
    const logData = {
      userId: data.updateDescription.updatedFields.change || oldRecord.change,
      type: data.operationType,
      data: {
        oldData: oldRecord,
        new: data.updateDescription.updatedFields,
      },
    };
    const newLogCreate = new this.logModel(logData);
    await newLogCreate.save();
  }
}
