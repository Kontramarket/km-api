import { Injectable } from '@nestjs/common';
import { CreateStandardUserDto } from './dto/create-standard-user.dto';
import { UpdateStandardUserDto } from './dto/update-standard-user.dto';

@Injectable()
export class StandardUserService {
  create(createStandardUserDto: CreateStandardUserDto) {
    return 'This action adds a new standardUser';
  }

  findAll() {
    return `This action returns all standardUser`;
  }

  findOne(id: number) {
    return `This action returns a #${id} standardUser`;
  }

  update(id: number, updateStandardUserDto: UpdateStandardUserDto) {
    return `This action updates a #${id} standardUser`;
  }

  remove(id: number) {
    return `This action removes a #${id} standardUser`;
  }
}
