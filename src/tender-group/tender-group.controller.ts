import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { TenderGroupService } from './tender-group.service';
import {
  CreateTenderGroupDto,
  UpdateTenderGroupDto,
} from './tender-group.model';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Admin } from 'src/metadata';

@ApiBearerAuth()
@ApiTags('Tender Group')
@Controller('tender-group')
export class TenderGroupController {
  constructor(private readonly tenderGroupService: TenderGroupService) {}

  @Admin()
  @Post()
  create(@Body() createTenderGroupDto: CreateTenderGroupDto) {
    return this.tenderGroupService.create(createTenderGroupDto);
  }

  @Get()
  findAll() {
    return this.tenderGroupService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tenderGroupService.findOne(id);
  }

  @Admin()
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTenderGroupDto: UpdateTenderGroupDto,
  ) {
    return this.tenderGroupService.update(id, updateTenderGroupDto);
  }
}
