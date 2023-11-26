import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { AdminService } from './admin.service';
import { RegisterAdminDto, UpdateAdminDto } from './admin.model';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  create(@Body() registerAdminDto: RegisterAdminDto) {
    return this.adminService.create(registerAdminDto);
  }

  @Get(':userId')
  findOne(@Param('userId') userId: string) {
    return this.adminService.findOne(userId);
  }

  @Patch(':userId')
  update(
    @Param('userId') userId: string,
    @Body() updateAdminDto: UpdateAdminDto,
  ) {
    return this.adminService.update(userId, updateAdminDto);
  }
}
