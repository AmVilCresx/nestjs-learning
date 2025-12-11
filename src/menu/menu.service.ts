import { Injectable } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Menu } from './entities/menu.entity';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { MenuTreeVo } from './vo/menu-tree.vo';

@Injectable()
export class MenuService {
  DEFAULT_PARENT_ID: string = '-1';

  constructor(
    @InjectRepository(Menu) private readonly menuRepository: Repository<Menu>,
  ) {}

  async create(createMenuDto: CreateMenuDto, curUser: any) {
    const tempMenu = plainToInstance(Menu, createMenuDto);
    const pId = tempMenu.parentId;
    if (!pId) {
      tempMenu.parentId = this.DEFAULT_PARENT_ID;
      tempMenu.parentIds = this.DEFAULT_PARENT_ID;
    } else {
      const parentMenu = await this.menuRepository.findOne({
        select: ['parentIds'],
        where: { id: pId },
      });
      if (!parentMenu) {
        throw new Error('参数非法，父级菜单不存在');
      }
      tempMenu.parentIds = parentMenu.parentIds + ',' + pId;
    }
    tempMenu.createBy = curUser.userId;
    tempMenu.updateBy = curUser.userId;
    tempMenu.createDate = new Date();
    tempMenu.updateDate = new Date();
    return plainToInstance(Menu, this.menuRepository.save(tempMenu));
  }

  async findTree(): Promise<MenuTreeVo[]> {
    const menus = await this.menuRepository.find({select: ["id", "name", "parentId", "componentPath", "href" ]});
    const menuVos = plainToInstance(MenuTreeVo, menus)
    const rootIds =
      menuVos.filter((menu) => menu.parentId === this.DEFAULT_PARENT_ID) || [];
    if (rootIds?.length === 0) {
      return [];
    }
    // 根据parentId 分完组，再组装数据，只需要循环一遍即可
    const menuGroup = this.groupBy(menuVos, menu => menu.parentId);
    menuVos.forEach(vo => {
      vo.children = menuGroup.get(vo.id) || [];
    })

    return menuVos;
  }

  async findOne(id: string) {
    return await this.menuRepository.findOneBy({ id });
  }

  async update(id: string, updateMenuDto: UpdateMenuDto) {
    return await this.menuRepository.update(id, updateMenuDto);
  }

  async remove(id: string) {
    return await this.menuRepository.delete(id);
  }

  groupBy(array, keyGetter) {
    const map = new Map();
    array.forEach((item) => {
      const key = keyGetter(item);
      if (!map.has(key)) {
        map.set(key, []);
      }
      map.get(key).push(item);
    });
    return map;
  }
}
