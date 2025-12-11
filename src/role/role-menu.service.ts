import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleMenu } from './entities/role-menu.entity';

@Injectable()
export class RoleMenuService {
  constructor(
    @InjectRepository(RoleMenu)
    private roleMenuRepository: Repository<RoleMenu>,
  ) {}

  async assignRoleToMenu(roleCode: string, menuIds?: string[]): Promise<any> {
    // 先删除，再重新插入
    await this.roleMenuRepository.delete({ roleCode });
    if (menuIds) {
      const roleMenus = menuIds.map(menuId => {return {roleCode, menuId}});
      this.roleMenuRepository.insert(roleMenus)
    }
    return {"message": "分配菜单成功"}
  }
}
