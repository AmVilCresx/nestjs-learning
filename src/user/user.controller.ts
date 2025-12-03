import { Controller, Get, Req } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/all')
  getAll(@Req() req) {
    console.log('请求用户信息：', req.user);
    return this.userService.findAll();
  }
}
