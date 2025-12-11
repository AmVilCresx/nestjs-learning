import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { CurrentUser } from '../user/decorator/user.decorator';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post('/add')
  async create(@Body() createMenuDto: CreateMenuDto, @CurrentUser() curUser: any) {
    return await this.menuService.create(createMenuDto, curUser);
  }

  @Get('tree')
  getMenuTree() {
    return this.menuService.findTree();
  }

  @Get('get/:id')
  async findOne(@Param('id') id: string) {
    return await this.menuService.findOne(id);
  }

  @Patch('update/:id')
  async update(@Param('id') id: string, @Body() updateMenuDto: UpdateMenuDto) {
    return await this.menuService.update(id, updateMenuDto);
  }

  @Delete('delete/:id')
 async remove(@Param('id') id: string) {
    return await this.menuService.remove(id);
  }
}
