import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'op_role', comment: '角色表' })
export class Role {

  @PrimaryColumn()
  code: string;

  @Column({ comment: '角色名称' })
  name: string;

  @Column({name: 'default_role', default: 0, comment: '是否默认角色，1是0否'})
  defaultRole: number;

  @Column({ nullable: true, comment: '角色描述' })
  description?: string;
}
