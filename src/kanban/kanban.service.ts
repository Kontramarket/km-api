import { Injectable } from '@nestjs/common';
import { Card, CreateCardDto, CreateListDto, Kanban } from './kanban.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class KanbanService {
  constructor(
    @InjectModel('kanban')
    private readonly kanbanModel: Model<Kanban>,
    @InjectModel('card')
    private readonly cardModel: Model<Card>,
  ) {}
  createList(createKanbanDto: CreateListDto, userId: string) {
    new this.kanbanModel({
      ...createKanbanDto,
      change: userId,
    }).save();
    return this.kanbanModel.find().populate('card', 'user');
  }
  async createCard(
    listId: string,
    createCardDto: CreateCardDto,
    userId: string,
  ) {
    const list = await this.kanbanModel.findById(listId);
    const newCard = new this.cardModel({
      ...createCardDto,
      change: userId,
    });
    newCard.save();
    list.cards.push(newCard._id);
    list.save();
    return this.kanbanModel.find().populate('card', 'user');
  }

  findAll(permissionLevel: number) {
    return this.kanbanModel
      .find({ allowed: permissionLevel })
      .populate('card', 'user');
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} kanban`;
  // }

  // update(id: number, updateKanbanDto: UpdateKanbanDto) {
  //   return `This action updates a #${id} kanban`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} kanban`;
  // }
}
