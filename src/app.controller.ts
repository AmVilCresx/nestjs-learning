import * as common from '@nestjs/common';
import { Controller, Get, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { AppService } from './app.service';
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: common.LoggerService,
  ) {}

  @Get()
  getHello(): string {
    this.logger.log(
      'info',
      `Database config: ${JSON.stringify(this.configService.get('db'))}`,
    );
    return this.appService.getHello();
  }
}
