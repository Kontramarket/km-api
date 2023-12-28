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
import { TenderAttributeService } from './tender-attribute.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  CreateTenderAttributeDto,
  UpdateTenderAttributeDto,
} from './tender-attribute.model';
import { Admin } from 'src/metadata';

@ApiBearerAuth()
@ApiTags('Tender Attribute')
@Controller('tender-attribute')
export class TenderAttributeController {
  constructor(
    private readonly tenderAttributeService: TenderAttributeService,
  ) {}

  @Admin()
  @Post()
  create(
    @Body() createTenderAttributeDto: CreateTenderAttributeDto,
    @Request() req,
  ) {
    return this.tenderAttributeService.create(
      createTenderAttributeDto,
      req.user.userId,
    );
  }

  @Get()
  findAll() {
    return this.tenderAttributeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tenderAttributeService.findOne(id);
  }

  @Admin()
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTenderAttributeDto: UpdateTenderAttributeDto,
    @Request() req,
  ) {
    return this.tenderAttributeService.update(
      id,
      updateTenderAttributeDto,
      req.user.userId,
    );
  }

  @Admin()
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.tenderAttributeService.remove(id, req.user.userId);
  }
}
