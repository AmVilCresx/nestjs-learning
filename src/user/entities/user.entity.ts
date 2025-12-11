import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'op_user' })
export class User {
  @PrimaryColumn()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_name' })
  username: string;

  @Column({ name: 'nick_name', nullable: true })
  nickname: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ length: 200, nullable: true })
  avatar: string;

  @Column({ length: 100 })
  email: string;

  @Column({ length: 32, nullable: true })
  @Exclude()
  phone: string;

  @Column({ name: 'first_letter' })
  firstLetter: string;

  @Column({ type: 'tinyint', default: 0 })
  gender: number; // 0: unknown, 1: male, 2: female

  @Column({ type: 'tinyint', default: 1 })
  status: number; // 0: disable, 1: enable

  @Exclude()
  @CreateDateColumn({
    type: 'datetime',
    name: 'create_date',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createDate: Date;

  @Exclude()
  @UpdateDateColumn({
    type: 'datetime',
    name: 'update_date',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateDate: Date;
}
