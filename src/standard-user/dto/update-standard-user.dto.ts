import { PartialType } from '@nestjs/swagger';
import { CreateStandardUserDto } from './create-standard-user.dto';

export class UpdateStandardUserDto extends PartialType(CreateStandardUserDto) {}
