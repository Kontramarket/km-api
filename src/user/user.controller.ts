import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthService } from 'src/auth/auth.service';
import { Public } from 'src/metadata';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { LoginUserDto, RegisterUserDto } from './user.model';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @ApiTags('User')
  @ApiBody({ type: LoginUserDto })
  @Public()
  @Post('login')
  login(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @ApiTags('User')
  @ApiBody({ type: RegisterUserDto })
  @Public()
  @Post()
  register(@Body() registerDto: Record<string, any>) {
    return this.userService.create(
      registerDto.email,
      registerDto.password,
      registerDto.permissionLevel,
      registerDto.firstName,
      registerDto.lastName,
      registerDto.dob,
      registerDto.username,
      registerDto.mb,
      registerDto.address,
      registerDto.zip,
      registerDto.website,
      registerDto.avatar,
      registerDto.targetGroups,
      registerDto.phoneNumber,
    );
  }

  @ApiTags('User')
  @Get('profile')
  @UseGuards(AuthGuard)
  getProfile(@Request() req) {
    return req.user;
  }
}
