import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const runPort = process.env.PORT ?? 3000
  app.setGlobalPrefix("/api")
  await app.listen(runPort);
  console.log("程序已启动，端口：", runPort)
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
