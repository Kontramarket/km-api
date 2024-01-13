import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chat, Message } from './chat-service.model';

@Injectable()
export class ChatServiceService {
  constructor(
    @InjectModel('chat') private readonly chatModel: Model<Chat>,
    @InjectModel('chat-message')
    private readonly chatMessageModel: Model<Message>,
  ) {}
  async getUserChat(users: string[]) {
    let chat = await this.chatModel.findOne({ users: users });
    if (!chat) {
      chat = await this.chatModel.findOne({ users: [users[1], users[0]] });
    }
    if (!chat) {
      chat = new this.chatModel({ users: users });
      await chat.save();
    }
    return chat;
  }
  async getUserChatById(chatId: string) {
    return await this.chatModel.findById(chatId);
  }
  async getMessages(chatId: string) {
    return await this.chatMessageModel
      .find({ chatId: chatId })
      .populate('userId');
  }
  async newMessage(chatId: string, senderId: string, message: string) {
    const newMessage = new this.chatMessageModel({
      chatId,
      userId: senderId,
      message,
    });
    await newMessage.save();
    return newMessage.populate('userId');
  }
  async seenBulk(chatId: string, myId: string) {
    const chat = await this.chatModel.findById(chatId);
    chat.users.forEach(async (user) => {
      if (user != myId) {
        await this.chatMessageModel.updateMany(
          { chatId, userId: user },
          { seen: true },
        );
      }
    });
  }
}
