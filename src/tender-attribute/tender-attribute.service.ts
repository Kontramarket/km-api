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
  async create(createTenderAttributeDto: CreateTenderAttributeDto) {
    const newTenderAttribute = new this.tenderAttributeModel(
      createTenderAttributeDto,
    );
    await newTenderAttribute.save();
    return newTenderAttribute;
  }

  async findAll() {
    return await this.tenderAttributeModel.find();
  }

  async findOne(id: string) {
    return await this.tenderAttributeModel.find({ groupId: id });
  }

  async update(id: string, updateTenderAttributeDto: UpdateTenderAttributeDto) {
    return await this.tenderAttributeModel.findByIdAndUpdate(
      { id },
      { updateTenderAttributeDto },
    );
  }

  async remove(id: string) {
    return await this.tenderAttributeModel.findOneAndUpdate(
      { id },
      { hidden: true },
    );
  }
}
