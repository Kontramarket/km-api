import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import {
  CreateTenderAttributeDto,
  TenderAttribute,
  UpdateTenderAttributeDto,
} from './tender-attribute.model';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class TenderAttributeService {
  constructor(
    @InjectModel('tender-attribute')
    private readonly tenderAttributeModel: Model<TenderAttribute>,
  ) {}
  async create(
    createTenderAttributeDto: CreateTenderAttributeDto,
    userId: string,
  ) {
    const newTenderAttribute = new this.tenderAttributeModel({
      ...createTenderAttributeDto,
      change: userId,
    });
    await newTenderAttribute.save();
    return await this.tenderAttributeModel.find({
      groupId: createTenderAttributeDto.groupId,
    });
  }

  async findAll() {
    return await this.tenderAttributeModel.find();
  }

  async findOne(id: string) {
    return await this.tenderAttributeModel.find({ groupId: id });
  }

  async update(
    id: string,
    updateTenderAttributeDto: UpdateTenderAttributeDto,
    userId: string,
  ) {
    const attib = await this.tenderAttributeModel.findByIdAndUpdate(
      { _id: id },
      { ...updateTenderAttributeDto, change: userId },
    );
    return await this.tenderAttributeModel.find({ groupId: attib.groupId });
  }

  async remove(id: string, userId: string) {
    return await this.tenderAttributeModel.findOneAndUpdate(
      { id },
      { hidden: true, change: userId },
    );
  }
}
