import { Body, Controller, Post } from '@nestjs/common';
import { Public } from 'src/common/decorators/public.decorator';
import { RoleAddDto } from './dto/role-add.dto';
import { RoleService } from './role.service';

@Controller('role')
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Public()
  @Post('/add')
  async addRole(@Body() dto: RoleAddDto) {
    return await this.roleService.addRole(dto);
  }
}
