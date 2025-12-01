import { IsNotEmpty, IsString } from "class-validator";

export class RoleAddDto {
    @IsString()
    @IsNotEmpty({ message: '角色编号不能为空' })
    code: string;

    @IsString()
    @IsNotEmpty({ message: '角色名称不能为空' })
    name: string;

    defaultRole: number;
    
    description?: string;
}