import { Global, Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import configuration from './configuration';
import { DbconfigModule } from './dbconfig/dbconfig.module';
import { JwtAuthGuard } from './guards/jwt.guard';
import { LogsModule } from './log/log.module';
import { UserModule } from './user/user.module';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 全局生效
      // envFilePath,
      load: [configuration],
    }),
    LogsModule,
    DbconfigModule,
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    Logger,
    // ConfigService,
    // {
    //   provide: APP_GUARD,
    //   useClass: JwtAuthGuard, // 这种注册方式，可以访问DI容器
    // },
  ],
  exports: [Logger],
})
export class AppModule {}
