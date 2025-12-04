import { Injectable } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Menu } from './entities/menu.entity';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class MenuService {

  DEFAULT_PARENT_ID: string = '-1';

  constructor(@InjectRepository(Menu) private readonly menuRepository: Repository<Menu>){

  }

  async create(createMenuDto: CreateMenuDto, curUser: any) {
    const tempMenu = plainToInstance(Menu, createMenuDto);
     const pId = tempMenu.parentId;
    if (!pId) {
      tempMenu.parentId = this.DEFAULT_PARENT_ID;
      tempMenu.parentIds = this.DEFAULT_PARENT_ID;
    } else {
      const parentMenu = await this.menuRepository.findOne({select: ['parentIds'], where: {id: pId}});
      if (!parentMenu) {
        throw new Error('参数非法，父级菜单不存在')
      }
      tempMenu.parentIds = parentMenu.parentIds + ',' + pId
    }
    tempMenu.createBy = curUser.userId;
    tempMenu.updateBy = curUser.userId;
    tempMenu.createDate = new Date();
    tempMenu.updateDate = new Date();
    return plainToInstance(Menu, this.menuRepository.save(tempMenu));
  }

  findAll() {
    return `This action returns all menu`;
  }

  findOne(id: number) {
    return `This action returns a #${id} menu`;
  }

  update(id: number, updateMenuDto: UpdateMenuDto) {
    return `This action updates a #${id} menu`;
  }

  remove(id: number) {
    return `This action removes a #${id} menu`;
  }
}
