import { IsBase64, IsEmail, IsEmpty, IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber, IsString, Length } from "class-validator";

export class UserSignUpDto {
    
    @IsString({message: '用户名必须是字符串类型'})
    @IsNotEmpty({message: '用户名不能为空'})
    @Length(4, 20, {message: `用户名长度必须在$constraint1到$constraint2个字符之间`})
    username: string;

    @IsOptional()
    @Length(4, 30, {message: '昵称长度必须在$constraint1到$constraint2个字符之间'})
    nickname?: string;

    @IsOptional()
    @IsEmail({}, {message: '邮箱格式不正确'})
    email?: string;

    @IsOptional()
    @IsPhoneNumber('CN', {message: '手机号格式不正确'})
    phone?: string;

    @IsString({message: '密码必须是字符串类型'})
    @IsNotEmpty({message: '密码不能为空'})
    @IsBase64({}, {message: '密码必须是Base64格式的字符串'})
    // @Length(8, 32, {message: `密码长度必须在$constraint1到$constraint2个字符之间`})
    password: string;

    @IsOptional()
    @IsNumber({}, {message: '性别必须是数字类型'})
    gender?: number;

    /**
     * 验证码， 预留
     */
    verificationCode?: string;
}