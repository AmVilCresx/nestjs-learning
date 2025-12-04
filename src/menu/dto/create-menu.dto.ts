import { IsNotEmpty, IsOptional, Length } from "class-validator";

export class CreateMenuDto {
   

    @IsNotEmpty({ message: '菜单名称不能为空' })
    @Length(3, 50, { message: `菜单名称长度必须在$constraint1到$constraint2个字符之间` })
    name: string;

    /**
     * 前端组件地址
     */
    @IsNotEmpty({ message: '前端组件地址不能为空' })
    @Length(4, 64, { message: `前端组件地址长度必须在$constraint1到$constraint2个字符之间` })
    componentPath: string;

    /**
     * 菜单uri
     */
    @IsNotEmpty({ message: '菜单uri不能为空' })
    @Length(4, 64, { message: `菜单uri长度必须在$constraint1到$constraint2个字符之间` })
    href: string;

    /**
     * 父级Id
     */
    @IsOptional()
    parentId?: string;
}
