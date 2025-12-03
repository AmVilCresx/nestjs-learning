import { Body, Controller, Param, Post } from '@nestjs/common';
import { RoleAddDto } from './dto/role-add.dto';
import { RoleService } from './role.service';

@Controller('role')
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Post('/add')
  async addRole(@Body() dto: RoleAddDto) {
    return await this.roleService.addRole(dto);
  }

  @Post('/delete/:code')
  async delete(@Param('code') code: string) {
    return await this.roleService.deleteByCode(code);
  }
}
