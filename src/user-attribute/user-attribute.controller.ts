import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
} from '@nestjs/common';
import { UserAttributeService } from './user-attribute.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  CreateUserAttributeDto,
  UpdateUserAttributeDto,
} from './user-attribute.model';
import { Admin } from 'src/metadata';

@ApiBearerAuth()
@ApiTags('User Attribute')
@Controller('user-attribute')
export class UserAttributeController {
  constructor(private readonly userAttributeService: UserAttributeService) {}

  @Admin()
  @Post()
  create(
    @Body() createUserAttributeDto: CreateUserAttributeDto,
    @Request() req,
  ) {
    return this.userAttributeService.create(
      createUserAttributeDto,
      req.user.userId,
    );
  }

  @Get()
  findAll() {
    return this.userAttributeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userAttributeService.findOne(id);
  }

  @Admin()
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserAttributeDto: UpdateUserAttributeDto,
    @Request() req,
  ) {
    return this.userAttributeService.update(
      id,
      updateUserAttributeDto,
      req.user.userId,
    );
  }

  @Admin()
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.userAttributeService.remove(id, req.user.userId);
  }
}
