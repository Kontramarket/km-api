import { Injectable } from '@nestjs/common';
import { CreateNewsDto, News, UpdateNewsDto } from './news.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class NewsService {
  constructor(
    @InjectModel('news')
    private readonly newsModel: Model<News>,
  ) {}
  async create(createNewsDto: CreateNewsDto, userId: string) {
    const newNews = new this.newsModel({ ...createNewsDto, change: userId });
    await newNews.save();
    return newNews;
  }

  findByType(type: string) {
    return this.newsModel.find({ type: type }).sort({ createdAt: 'desc' });
  }

  findAll() {
    return this.newsModel.find().sort({ createdAt: 'desc' });
  }

  findOne(id: string) {
    return this.newsModel.findById(id);
  }

  update(id: string, updateNewsDto: UpdateNewsDto, userId: string) {
    return this.newsModel.findByIdAndUpdate(id, {
      ...updateNewsDto,
      change: userId,
    });
  }
}
