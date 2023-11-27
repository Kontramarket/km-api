import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CompanyUserService } from './company-user.service';
import { CreateCompanyUserDto } from './dto/create-company-user.dto';
import { UpdateCompanyUserDto } from './dto/update-company-user.dto';

@Controller('company-user')
export class CompanyUserController {
  constructor(private readonly companyUserService: CompanyUserService) {}

  @Post()
  create(@Body() createCompanyUserDto: CreateCompanyUserDto) {
    return this.companyUserService.create(createCompanyUserDto);
  }

  @Get()
  findAll() {
    return this.companyUserService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companyUserService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCompanyUserDto: UpdateCompanyUserDto,
  ) {
    return this.companyUserService.update(+id, updateCompanyUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.companyUserService.remove(+id);
  }
}
