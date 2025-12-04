import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleModule } from 'src/role/role.module';
import { UserRoleService } from './user-role.service';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserRole } from './user-role.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([User, UserRole]), RoleModule],
  controllers: [UserController],
  providers: [UserService, UserRoleService],
  exports: [UserService, UserRoleService],
})
export class UserModule {}
