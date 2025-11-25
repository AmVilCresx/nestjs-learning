import { ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './filters/all-exception.filter';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {});
  const logger = app.get(WINSTON_MODULE_NEST_PROVIDER);
  app.useLogger(logger);
  const runPort = process.env.PORT ?? 3000;
  const httpAdpter = app.get(HttpAdapterHost);
  app.setGlobalPrefix('/api');
  // 全局只能有一个 Filter
  app.useGlobalFilters(new AllExceptionFilter(logger, httpAdpter));
  // 全局管道
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(runPort);

  logger.log(`程序已启动，端口：${runPort}`);
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
