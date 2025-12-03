import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'; // 引入 bcrypt
import { plainToInstance } from 'class-transformer';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { UserSignUpDto } from './dto/user-signup.dto';
import { RsaService } from './rsa.service';
import { RoleService } from '../role/role.service';
import { UserRoleService } from '../user/user-role.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwt: JwtService,
    private readonly rsaService: RsaService,
    private readonly roleService: RoleService,
    private readonly userRoleSrvice: UserRoleService,
  ) {}

  async signIn(username: string, password: string) {
    const user = await this.userService.findByUserName(username);
    // 校验用户名密码
    if (!user) {
      throw new UnauthorizedException('用户名或密码错误');
    }
    // 密码是RSA加密的，得先解密
    const passwordRaw = this.rsaService.decrypt(password);
    const isMatch = bcrypt.compareSync(passwordRaw, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('用户名或密码错误');
    }
    const userRoles = this.userRoleSrvice.findRolesByUserId(user.id);
    const roleCodes = (await userRoles).map((role) => role.roleCode);
    // 生成token
    return await this.jwt.signAsync({
      username,
      sub: user.id,
      roles: roleCodes || ['user'],
    });
  }

  async signUp(dto: UserSignUpDto) {
    const { password, username } = dto;
    const existsUser = await this.userService.findByUserName(username);
    if (existsUser) {
      throw new ForbiddenException('用户名已存在');
    }
    // 先得到明文
    const passwordRaw = this.rsaService.decrypt(password);
    // 再加密存储
    const hashedPassword = bcrypt.hashSync(passwordRaw, 8);
    dto.password = hashedPassword;
    const createUserDto = plainToInstance(CreateUserDto, dto);
    const user = await this.userService.createUser(createUserDto)
    // 查询默认角色
    const defaultRoles = await this.roleService.findDefaultRoles();
    await this.userRoleSrvice.assignRoleToUser(user.id, defaultRoles.map(role => role.code));

    return user;
  }

  getPublicKey() {
    return this.rsaService.getPublicKey();
  }
}
