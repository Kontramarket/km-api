import { Injectable } from '@nestjs/common';
import { CreateTenderDto, Tender, UpdateTenderDto } from './tender.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TenderService {
  constructor(
    @InjectModel('tender')
    private readonly tenderModel: Model<Tender>,
  ) {}
  async create(createTenderDto: CreateTenderDto, user) {
    const newTender = new this.tenderModel({
      ownerId: user.userId,
      groupId: createTenderDto.groupId,
      data: createTenderDto.data,
      change: user.userId,
    });
    await newTender.save();
    return newTender;
  }

  async findAll() {
    return await this.tenderModel.find();
  }

  async findOne(id: string) {
    return await this.tenderModel.findById(id);
  }

  async update(id: string, updateTenderDto: UpdateTenderDto, userId: string) {
    return await this.tenderModel.findByIdAndUpdate(
      { id },
      { ...updateTenderDto, change: userId },
    );
  }

  async remove(id: string, userId: string) {
    return await this.tenderModel.findByIdAndUpdate(
      { id },
      { hidden: true, change: userId },
    );
  }
}
