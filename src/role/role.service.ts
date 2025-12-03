import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';
import { RoleAddDto } from './dto/role-add.dto';
import { Role } from './role.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private roleRepository: Repository<Role>,
  ) {}

  async addRole(dto: RoleAddDto) {
    const { code } = dto;
    const existsRole = await this.roleRepository.findOne({ where: { code } });
    if (existsRole) {
      throw new Error('角色已存在');
    }
    const role = plainToInstance(Role, dto);
    const saveRole = await this.roleRepository.save(role);
    return saveRole;
  }

  async findDefaultRoles(): Promise<Role[]> {
    return await this.roleRepository.find({ where: { defaultRole: 1 } });
  }

  async deleteByCode(code: string) {
    await this.roleRepository.delete({ code });
    return { message: '角色删除成功' };
  }
}
