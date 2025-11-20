import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as winston from 'winston';
import { WinstonModule, utilities } from 'nest-winston';
import DailyRotateFile from 'winston-daily-rotate-file';

declare const module: any;

async function bootstrap() {
  const instance = winston.createLogger({
    transports: [
      new winston.transports.Console({
        level: 'debug',
        format: winston.format.combine(
          winston.format.timestamp(),
          utilities.format.nestLike(),
        ),
      }),

      new DailyRotateFile({
        level: 'info',
        dirname: 'logs',
        filename: 'nest-learning-%DATE%.log',
        datePattern: 'YYYY-MM-DD-HH',
        zippedArchive: true,
        maxSize: '200M',
        maxFiles: '14d',
        format: winston.format.combine(
          winston.format.timestamp(),
          utilities.format.nestLike(),
        ),
      })
    ],
  });

  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      instance,
    })
  });
  const runPort = process.env.PORT ?? 3000;
  app.setGlobalPrefix('/api');
  await app.listen(runPort);
  console.log('程序已启动，端口：', runPort);
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
