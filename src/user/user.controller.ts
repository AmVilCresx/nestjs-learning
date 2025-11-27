import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AdminGuard } from '../guards/admin.guard';
import { JwtAuthGuard } from '../guards/jwt.guard';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/all')
  @UseGuards(AdminGuard)
  getAll() {
    return this.userService.findAll();
  }
}
