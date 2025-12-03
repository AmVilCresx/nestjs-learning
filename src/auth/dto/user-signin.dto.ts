import { IsBase64, IsNotEmpty, IsString, Length } from 'class-validator';

export class UserSignInDto {
  @IsString()
  @IsNotEmpty()
  @Length(5, 20, {
    message: `用户名长度必须在$constraint1到$constraint2个字符之间`,
  })
  username: string;

  @IsString()
  @IsNotEmpty()
  @IsBase64({}, { message: '密码必须是Base64格式的字符串' })
  password: string;
}