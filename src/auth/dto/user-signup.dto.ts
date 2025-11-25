import { IsNotEmpty, IsString, Length } from "class-validator";

export class UserSignUpDto {
    
    @IsString()
    @IsNotEmpty()
    @Length(5, 20, {message: `用户名长度必须在$constraint1到$constraint2个字符之间`})
    username: string;

    @IsString()
    @IsNotEmpty()
    @Length(8, 32, {message: `密码长度必须在$constraint1到$constraint2个字符之间`})
    password: string;

    /**
     * 验证码， 预留
     */
    verificationCode?: string;
}