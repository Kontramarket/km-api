import { PartialType } from '@nestjs/swagger';
import { CreateSupportUserDto } from './create-support-user.dto';

export class UpdateSupportUserDto extends PartialType(CreateSupportUserDto) {}
