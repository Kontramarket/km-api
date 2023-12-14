import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { UserGroupService } from './user-group.service';
import { CreateUserGroupDto, UpdateUserGroupDto } from './user-group.model';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Admin } from 'src/metadata';

@ApiBearerAuth()
@ApiTags('User Group')
@Controller('user-group')
export class UserGroupController {
  constructor(private readonly userGroupService: UserGroupService) {}

  @Admin()
  @Post()
  create(@Body() createUserGroupDto: CreateUserGroupDto) {
    return this.userGroupService.create(createUserGroupDto);
  }

  @Get()
  findAll() {
    return this.userGroupService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userGroupService.findOne(id);
  }

  @Admin()
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserGroupDto: UpdateUserGroupDto,
  ) {
    return this.userGroupService.update(id, updateUserGroupDto);
  }
}
