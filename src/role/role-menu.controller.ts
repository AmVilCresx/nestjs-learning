import { Body, Controller, Post } from "@nestjs/common";
import { RoleMenuAssisgnDto } from "./dto/role-menu-assign.dto";
import { RoleMenuService } from "./role-menu.service";

@Controller('role-menu')
export class RoleMenuController {

    constructor(private roleMenuService: RoleMenuService) {}

      @Post('/assign')
      async assignMenuToRole(@Body() assignDto: RoleMenuAssisgnDto) {
        const { roleCode, menuIds } = assignDto;
        return await this.roleMenuService.assignRoleToMenu(roleCode, menuIds);
      }
}