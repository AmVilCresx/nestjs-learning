import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserSignInDto } from './dto/user-signin.dto';
import { UserSignUpDto } from './dto/user-signup.dto';

@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) {}

  /**
   * 登录
   */
  @Post('/signIn')
  signIn(@Body() dto: UserSignInDto) {
    const { username, password } = dto;
    return this.authService.signIn(username, password);
  }

  /**
   * 注册
   */
  @Post('signUp')
  async signUp(@Body() dto: UserSignUpDto) {
    return this.authService.signUp(dto);
  }
}
