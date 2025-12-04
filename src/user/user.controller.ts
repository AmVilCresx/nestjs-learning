import { Controller, Get } from '@nestjs/common';
import { Roles } from 'src/role/decorator/roles.decorator';
import { CurrentUser } from './decorator/user.decorator';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/all')
  @Roles('admin')
  getAll(@CurrentUser() user) {
    console.log('请求用户信息：', user);
    return this.userService.findAll();
  }
}
