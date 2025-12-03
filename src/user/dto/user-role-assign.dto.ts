import { IsNotEmpty, IsString } from "class-validator";

export class UserRoleAssignDto {

    @IsString()
    @IsNotEmpty({ message: '用户ID不能为空' })
    userId: string;

    @IsNotEmpty({ message: '角色编码不能为空' })
    roleCodes: string[];
}