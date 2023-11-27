import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Request,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { RegisterAdminDto, UpdateAdminDto } from './admin.model';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/metadata';

@ApiBearerAuth()
@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Public()
  @Post()
  create(@Body() registerAdminDto: RegisterAdminDto) {
    return this.adminService.create(registerAdminDto);
  }

  @Get()
  findOne(@Request() req) {
    return this.adminService.findOne(req.user.userId);
  }

  @Patch(':userId')
  update(
    @Param('userId') userId: string,
    @Body() updateAdminDto: UpdateAdminDto,
  ) {
    return this.adminService.update(userId, updateAdminDto);
  }
}
