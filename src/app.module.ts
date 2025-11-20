import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './configuration';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigEnum } from './common/enum/config.enum';
import { Logger } from 'winston';

// const envFilePath = `.env.${process.env.NODE_ENV || `development`}`

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 全局生效
      // envFilePath,
      load: [configuration],
    }),
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: '127.0.0.1',
    //   port: 3306,
    //   password: 'xxxx',
    //   database: 'testdb',
    // }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: configService.get(ConfigEnum.DB_TYPE),
        host: configService.get(ConfigEnum.DB_HOST),
        port: configService.get(ConfigEnum.DB_PORT),
        username: configService.get(ConfigEnum.DB_USER_NAME),
        password: configService.get(ConfigEnum.DB_PASSWORD),
        database: configService.get(ConfigEnum.DB_DATABASE)
      } as TypeOrmModuleOptions) 
    }),
  ],
  controllers: [AppController],
  providers: [AppService, Logger],
  exports: [Logger]
})
export class AppModule {}
