import { Controller, Get, Post, Body, Param, Request } from '@nestjs/common';
import { KanbanService } from './kanban.service';
import { CreateCardDto, CreateListDto } from './kanban.model';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Admin } from 'src/metadata';

@ApiBearerAuth()
@ApiTags('Kanban')
@Controller('kanban')
export class KanbanController {
  constructor(private readonly kanbanService: KanbanService) {}

  @Admin()
  @Post('list')
  createList(@Body() createKanbanDto: CreateListDto, @Request() req) {
    return this.kanbanService.createList(createKanbanDto, req.user.userId);
  }

  @Admin()
  @Post('card/:listId')
  createCard(
    @Param('listId') listId: string,
    @Body() createCardDto: CreateCardDto,
    @Request() req,
  ) {
    return this.kanbanService.createCard(
      listId,
      createCardDto,
      req.user.userId,
    );
  }

  @Get()
  findAll(@Request() req) {
    return this.kanbanService.findAll(req.user.permissionLevel);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.kanbanService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateKanbanDto: UpdateKanbanDto) {
  //   return this.kanbanService.update(+id, updateKanbanDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.kanbanService.remove(+id);
  // }
}
