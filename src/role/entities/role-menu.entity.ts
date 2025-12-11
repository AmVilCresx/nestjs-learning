import { Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'op_role_menu', comment: '角色-菜单表' })
export class RoleMenu {

  @PrimaryColumn({comment: "角色编码", name: 'role_code'})
  roleCode: string;

  @PrimaryColumn({ comment: '菜单Id', name: 'menu_id' })
  menuId: string;
}
