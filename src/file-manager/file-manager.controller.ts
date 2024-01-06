import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Get,
  Param,
  Request,
  Response,
  Header,
} from '@nestjs/common';
import { FileManagerService } from './file-manager.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/metadata';

@ApiBearerAuth()
@ApiTags('FileManager')
@Controller('file-manager')
export class FileManagerController {
  constructor(private readonly fileManagerService: FileManagerService) {}

  @ApiBody({
    required: true,
    type: 'multipart/form-data',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiConsumes('multipart/form-data')
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File, @Request() req) {
    return this.fileManagerService.uploadFile(file, req.user.userId);
  }
  @Public()
  @Header('content-type', 'application/octet-stream')
  @Get(':fileName')
  async serveFile(@Param('fileName') fileName: string, @Response() res) {
    const file = await this.fileManagerService.serveFile(fileName);
    file.pipe(res);
  }
}
