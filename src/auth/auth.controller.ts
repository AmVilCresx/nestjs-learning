import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserSignInDto } from './dto/user-signin.dto';
import { UserSignUpDto } from './dto/user-signup.dto';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) {}

  /**
   * 登录
   */
  @Public()
  @Post('/signIn')
  async signIn(@Body() dto: UserSignInDto) {
    const { username, password } = dto;
    const token = await this.authService.signIn(username, password);
    return {
      access_token: token
    }
  }

  /**
   * 注册
   */
  @Public()
  @Post('signUp')
  async signUp(@Body() dto: UserSignUpDto) {
    return await this.authService.signUp(dto);
  }

  @Get('/pubKey')
  publicKey() {
    return this.authService.getPublicKey();
  }
}
