import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StandardUserService } from './standard-user.service';
import { CreateStandardUserDto } from './dto/create-standard-user.dto';
import { UpdateStandardUserDto } from './dto/update-standard-user.dto';

@Controller('standard-user')
export class StandardUserController {
  constructor(private readonly standardUserService: StandardUserService) {}

  @Post()
  create(@Body() createStandardUserDto: CreateStandardUserDto) {
    return this.standardUserService.create(createStandardUserDto);
  }

  @Get()
  findAll() {
    return this.standardUserService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.standardUserService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateStandardUserDto: UpdateStandardUserDto,
  ) {
    return this.standardUserService.update(+id, updateStandardUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.standardUserService.remove(+id);
  }
}
