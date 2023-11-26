import { Injectable } from '@nestjs/common';
import { CreateSupportUserDto } from './dto/create-support-user.dto';
import { UpdateSupportUserDto } from './dto/update-support-user.dto';

@Injectable()
export class SupportUserService {
  create(createSupportUserDto: CreateSupportUserDto) {
    return 'This action adds a new supportUser';
  }

  findAll() {
    return `This action returns all supportUser`;
  }

  findOne(id: number) {
    return `This action returns a #${id} supportUser`;
  }

  update(id: number, updateSupportUserDto: UpdateSupportUserDto) {
    return `This action updates a #${id} supportUser`;
  }

  remove(id: number) {
    return `This action removes a #${id} supportUser`;
  }
}
