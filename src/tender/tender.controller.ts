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
import { TenderService } from './tender.service';
import { CreateTenderDto, UpdateTenderDto } from './tender.model';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Tender')
@Controller('tender')
export class TenderController {
  constructor(private readonly tenderService: TenderService) {}

  @Post()
  create(@Body() createTenderDto: CreateTenderDto, @Request() req) {
    return this.tenderService.create(createTenderDto, req.user);
  }

  @Get()
  findAll() {
    return this.tenderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tenderService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTenderDto: UpdateTenderDto,
    @Request() req,
  ) {
    return this.tenderService.update(id, updateTenderDto, req.user.userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.tenderService.remove(id, req.user.userId);
  }
}
