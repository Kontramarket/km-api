import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Request,
} from '@nestjs/common';
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
  create(@Body() createTenderGroupDto: CreateTenderGroupDto, @Request() req) {
    return this.tenderGroupService.create(
      createTenderGroupDto,
      req.user.userId,
    );
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
    @Request() req,
  ) {
    return this.tenderGroupService.update(
      id,
      updateTenderGroupDto,
      req.user.userId,
    );
  }
}
