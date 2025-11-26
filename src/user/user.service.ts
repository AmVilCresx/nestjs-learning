import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { pinyin } from 'pinyin-pro';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
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
    const firstLetter = getFirstInitial(dto.username);
    const userTemp = { ...dto, firstLetter } as User;
    const saveUser = await this.userRepo.save(userTemp);
    return plainToInstance(User, saveUser); // 触发 @Exclude()
  }
}

function getFirstInitial(text: string): string {
  if (!text?.trim()) return '#';

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
