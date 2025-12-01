import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleAddDto } from './dto/role-add.dto';
import { Role } from './role.entity';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private roleRepository: Repository<Role>,
  ) {}

  async addRole(dto: RoleAddDto) {
    const role = plainToInstance(Role, dto);
    console.log('转换后的 Role 实体', role);
    const saveRole = await this.roleRepository.save(role);
    return saveRole;
  }
}
