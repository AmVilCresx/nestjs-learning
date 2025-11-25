import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { UserSignUpDto } from './dto/user-signup.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async signIn(username: string, password: string) {
    const user = await this.userService.findByUserName(username);
    return user;
  }

  async signUp(dto: UserSignUpDto) {
    const createUserDto = { ...dto } as CreateUserDto;
    return await this.userService.createUser(createUserDto);
  }
}
