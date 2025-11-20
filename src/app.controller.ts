import { Controller, Get, LoggerService } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
import { ConfigEnum } from './common/enum/config.enum';
import { Logger } from 'winston';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
    private readonly logger: Logger,
  ) {}

  @Get()
  getHello(): string {
    this.logger.log('current_cfg===>', this.configService.get('db'))
    return this.appService.getHello();
  }
}
