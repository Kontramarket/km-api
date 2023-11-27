import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TenderAttributeService } from './tender-attribute.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  CreateTenderAttributeDto,
  UpdateTenderAttributeDto,
} from './tender-attribute.model';

@ApiBearerAuth()
@ApiTags('Tender Attribute')
@Controller('tender-attribute')
export class TenderAttributeController {
  constructor(
    private readonly tenderAttributeService: TenderAttributeService,
  ) {}

  @Post()
  create(@Body() createTenderAttributeDto: CreateTenderAttributeDto) {
    return this.tenderAttributeService.create(createTenderAttributeDto);
  }

  @Get()
  findAll() {
    return this.tenderAttributeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tenderAttributeService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTenderAttributeDto: UpdateTenderAttributeDto,
  ) {
    return this.tenderAttributeService.update(id, updateTenderAttributeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tenderAttributeService.remove(id);
  }
}
