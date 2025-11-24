import { Global, Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from './configuration';
import { DbconfigModule } from './dbconfig/dbconfig.module';
import { LogsModule } from './log/log.module';
import { AuthModule } from './auth/auth.module';
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
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService, Logger, ConfigService],
  exports: [Logger],
})
export class AppModule {}
