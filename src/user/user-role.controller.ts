import { Body, Controller, Post } from '@nestjs/common';
import { UserRoleAssignDto } from './dto/user-role-assign.dto';
import { UserRoleService } from './user-role.service';

@Controller('user-role')
export class UserRoleController {
    
  constructor(private userRoleService: UserRoleService) {}

  @Post('/assign')
  async assignRoleToUser(@Body() assignDto: UserRoleAssignDto) {
    const { userId, roleCodes } = assignDto;
    return await this.userRoleService.assignRoleToUser(userId, roleCodes);
  }
}
