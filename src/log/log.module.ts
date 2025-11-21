import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { utilities, WinstonModule, WinstonModuleOptions } from 'nest-winston';
import winston from 'winston';
import { Console } from 'winston/lib/winston/transports';
import DailyRotateFile from 'winston-daily-rotate-file';
import { LogEnum } from 'src/common/enum/config.enum';

@Module({
  imports: [
    WinstonModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const consoleTransport = new Console({
          level: configService.get(LogEnum.LOG_LEVEL),
          format: winston.format.combine(
            winston.format.timestamp(),
            utilities.format.nestLike(),
          ),
        });

        const dailyRotateTransport = new DailyRotateFile({
          level: configService.get(LogEnum.LOG_LEVEL),
          dirname: 'logs',
          filename: 'nest-learning-%DATE%.log',
          datePattern: 'YYYY-MM-DD-HH',
          zippedArchive: true,
          maxSize: '200m',
          maxFiles: '14d',
          format: winston.format.combine(
            winston.format.timestamp(),
            utilities.format.nestLike(),
          ),
        });

        return {
          transports: [consoleTransport, dailyRotateTransport],
        } as WinstonModuleOptions;
      },
    }),
  ],
})
export class LogsModule {}
