import { Global, Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './common/guards/jwt.guard';
import { PriorityGuardExecutor } from './common/guards/priority.guard-executor';
import { RolesGuard } from './common/guards/role.guard';
import configuration from './configuration';
import { DbconfigModule } from './dbconfig/dbconfig.module';
import { LogsModule } from './log/log.module';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';

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
    RoleModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    Logger,
    JwtAuthGuard,
    RolesGuard,
    {
      provide: APP_GUARD,
      useFactory: (jwtAuthGuard: JwtAuthGuard, roleGruard: RolesGuard) => {
        return new PriorityGuardExecutor([jwtAuthGuard, roleGruard]);
      },
      inject: [JwtAuthGuard, RolesGuard],
    },
  ],
  exports: [Logger],
})
export class AppModule {}
