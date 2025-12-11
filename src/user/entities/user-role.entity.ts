import { Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'op_user_role' })
export class UserRole {

  @PrimaryColumn({ name: 'user_id' })
  userId: string;

  @PrimaryColumn({ name: 'role_code' })
  roleCode: string;
}
