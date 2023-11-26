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

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @ApiBody({ type: LoginUserDto })
  @Public()
  @Post('login')
  login(
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    return this.authService.signIn(username, password);
  }

  @ApiBody({ type: RegisterUserDto })
  @Public()
  @Post()
  register(
    @Body('username') username: string,
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('permissionLevel') permissionLevel: number,
  ) {
    return this.userService.create(username, email, password, permissionLevel);
  }

  @ApiBearerAuth()
  @Get('profile')
  @UseGuards(AuthGuard)
  getProfile(@Request() req) {
    return req.user;
  }
}
