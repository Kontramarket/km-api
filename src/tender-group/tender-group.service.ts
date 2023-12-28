import { Injectable } from '@nestjs/common';
import {
  CreateTenderGroupDto,
  TenderGroup,
  UpdateTenderGroupDto,
} from './tender-group.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class TenderGroupService {
  constructor(
    @InjectModel('tender-group')
    private readonly tenderGroupModel: Model<TenderGroup>,
  ) {}
  async create(createTenderGroupDto: CreateTenderGroupDto, userId: string) {
    const newTenderGroup = new this.tenderGroupModel({
      ...createTenderGroupDto,
      change: userId,
    });
    await newTenderGroup.save();
    return await this.tenderGroupModel.find().populate('parentGroup');
  }

  async findAll() {
    return await this.tenderGroupModel.find().populate('parentGroup');
  }

  async findOne(id: string) {
    return await this.tenderGroupModel.findById(id);
  }

  async update(
    id: string,
    updateTenderGroupDto: UpdateTenderGroupDto,
    userId: string,
  ) {
    await this.tenderGroupModel.findOneAndUpdate(
      { _id: id },
      { ...updateTenderGroupDto, change: userId },
    );
    return await this.tenderGroupModel.find().populate('parentGroup');
  }
}
