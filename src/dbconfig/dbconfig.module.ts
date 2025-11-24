import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigEnum } from 'src/common/enum/config.enum';
import { User } from 'src/user/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory:(configService: ConfigService) => {
        
        return {
            type: configService.get(ConfigEnum.DB_TYPE),
            host: configService.get(ConfigEnum.DB_HOST),
            port: configService.get(ConfigEnum.DB_PORT),
            username: configService.get(ConfigEnum.DB_USER_NAME),
            password: configService.get(ConfigEnum.DB_PASSWORD),
            database: configService.get(ConfigEnum.DB_DATABASE),
            entities: [User]
          } as TypeOrmModuleOptions;
      }
    }),
  ],
})
export class DbconfigModule {}
