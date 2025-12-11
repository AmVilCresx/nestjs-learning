import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { Role } from './entities/role.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleMenu } from './entities/role-menu.entity';
import { RoleMenuController } from './role-menu.controller';
import { RoleMenuService } from './role-menu.service';

@Module({
    imports: [TypeOrmModule.forFeature([Role, RoleMenu])],
    controllers: [RoleController, RoleMenuController],
    providers: [RoleService, RoleMenuService],
    exports: [RoleService],
})
export class RoleModule {}
