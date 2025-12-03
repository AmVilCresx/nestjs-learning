import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { pinyin } from 'pinyin-pro';
import { REGEX } from '../common/regex.constants';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { RoleService } from '../role/role.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly roleSercvice: RoleService,
  ) {}

  async findAll() {
    const res = await this.userRepo.find();
    return plainToInstance(User, res);
  }

  async findByUserName(username: string): Promise<User | null> {
    const user = await this.userRepo.findOne({ where: { username } });
    return user;
  }

  async createUser(dto: CreateUserDto): Promise<User> {
    const candidateName = dto.nickname || dto.username;
    const firstLetter = getFirstInitial(candidateName);
    const userTemp = { ...dto, firstLetter } as User;
    userTemp.createDate = new Date();
    userTemp.updateDate = new Date();
    const saveUser = await this.userRepo.save(userTemp);
    return plainToInstance(User, saveUser); // 触发 @Exclude()
  }
}

function getFirstInitial(text: string): string {
  if (!text?.trim()) {
    return '#';
  }

  const match = REGEX.USER_NAME_START.test(text.trim());
  if (!match) {
    return '#';
  }

  const firstChar = text.trim()[0];

  // 中文字符（Unicode 范围 \u4e00-\u9fa5）
  if (/[\u4e00-\u9fa5]/.test(firstChar)) {
    return pinyin(firstChar, {
      pattern: 'first',
      toneType: 'none',
    }).toUpperCase();
  }

  // 英文字母
  if (/[a-zA-Z]/.test(firstChar)) {
    return firstChar.toUpperCase();
  }

  // 其他字符（数字、符号等）
  return '#';
}
