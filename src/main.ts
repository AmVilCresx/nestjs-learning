import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import {
  WINSTON_MODULE_NEST_PROVIDER
} from 'nest-winston';
import { AppModule } from './app.module';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {});
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  const runPort = process.env.PORT ?? 3000;
  const httpAdpter = app.get(HttpAdapterHost);
  app.setGlobalPrefix('/api');
  // 全局只能有一个 Filter
  // app.useGlobalFilters(new AllExceptionFilter(logger, httpAdpter));
  await app.listen(runPort);
  console.log('程序已启动，端口：', runPort);
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
