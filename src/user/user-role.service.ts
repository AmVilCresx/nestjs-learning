import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRole } from './entities/user-role.entity';

@Injectable()
export class UserRoleService {
  constructor(
    @InjectRepository(UserRole)
    private userRoleRepository: Repository<UserRole>,
  ) {}

  async assignRoleToUser(userId: string, roleCodes: string[]) {
    // 先删除用户已有的角色
    await this.userRoleRepository.delete({ userId });
    roleCodes.forEach(async (roleCode) => {
      const userRole = this.userRoleRepository.create({ userId, roleCode });
      await this.userRoleRepository.save(userRole);
    });
    return { message: '角色分配成功' };
  }

  async findRolesByUserId(userId: string): Promise<UserRole[]> {
    return await this.userRoleRepository.find({ where: { userId } });
  }
}
