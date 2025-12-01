import { Controller } from "@nestjs/common";
import { RoleService } from "src/role/role.service";

@Controller('user-role')
export class UserRoleController {
    
    constructor(private roleService: RoleService) {
        
    }
}