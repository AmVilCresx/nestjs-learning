import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigEnum } from '../common/enum/config.enum';
import { SnowflakeSubscriber } from 'src/common/snowflake/entity-listener';
import { SnowflakeModule } from '../common/snowflake/snowflake.module';
import { SnowflakeService } from 'src/common/snowflake/snowflake.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports:[SnowflakeModule],
      inject: [ConfigService, SnowflakeService],
      useFactory: (configService: ConfigService) => {
        return {
          type: configService.get(ConfigEnum.DB_TYPE),
          host: configService.get(ConfigEnum.DB_HOST),
          port: configService.get(ConfigEnum.DB_PORT),
          username: configService.get(ConfigEnum.DB_USER_NAME),
          password: configService.get(ConfigEnum.DB_PASSWORD),
          database: configService.get(ConfigEnum.DB_DATABASE),
          subscribers: [SnowflakeSubscriber], // 注册雪花ID订阅者
          connectTimeout: 60000, // 连接超时
          timeout: 60000, // 查询超时（可选）
          connectorPackage: 'mysql2', 
          // entities: [baseDir + '/**/*.entity.{ts,js}'],
          entities: [__dirname + '/../**/*.entity.{ts,js}'],
        } as TypeOrmModuleOptions;
      },
    }),
  ],
})
export class DbconfigModule {}
