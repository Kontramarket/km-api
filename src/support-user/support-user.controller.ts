import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SupportUserService } from './support-user.service';
import { CreateSupportUserDto } from './dto/create-support-user.dto';
import { UpdateSupportUserDto } from './dto/update-support-user.dto';

@Controller('support-user')
export class SupportUserController {
  constructor(private readonly supportUserService: SupportUserService) {}

  @Post()
  create(@Body() createSupportUserDto: CreateSupportUserDto) {
    return this.supportUserService.create(createSupportUserDto);
  }

  @Get()
  findAll() {
    return this.supportUserService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.supportUserService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSupportUserDto: UpdateSupportUserDto) {
    return this.supportUserService.update(+id, updateSupportUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.supportUserService.remove(+id);
  }
}
