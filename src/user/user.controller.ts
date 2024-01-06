import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthService } from 'src/auth/auth.service';
import { Public } from 'src/metadata';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import {
  LoginUserDto,
  PasswordRecoveryDto,
  PasswordResetDto,
  RegisterUserDto,
} from './user.model';
import { AuthGuard } from 'src/auth/auth.guard';
import { MailServiceService } from 'src/mail-service/mail-service.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly mailService: MailServiceService,
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

  @ApiBody({ type: PasswordResetDto })
  @Public()
  @Post('password-reset')
  async passwordReset(@Body('email') email: string) {
    const user = await this.userService.getByEmail(email);
    if (user) {
      const resetUrl = await this.userService.createPasswordResetUrl(user._id);
      return {
        status: await this.mailService.passwordResetCMS(
          email,
          user.username,
          resetUrl,
        ),
      };
    } else {
      return {
        status: true,
      };
    }
  }

  @ApiBody({ type: PasswordRecoveryDto })
  @Public()
  @Post('password-reset/:token')
  async passwordRecovery(
    @Param('token') token: string,
    @Body('newPassword') newPassword: string,
  ) {
    return await this.userService.passwordRecovery(token, newPassword);
  }
}
