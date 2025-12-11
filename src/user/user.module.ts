import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleModule } from 'src/role/role.module';
import { UserRoleService } from './user-role.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { UserRole } from './entities/user-role.entity';
import { UserRoleController } from './user-role.controller';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([User, UserRole]), RoleModule],
  controllers: [UserController, UserRoleController],
  providers: [UserService, UserRoleService],
  exports: [UserService, UserRoleService],
})
export class UserModule {}
