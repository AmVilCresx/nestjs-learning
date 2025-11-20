import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
import { ConfigEnum } from './common/enum/config.enum';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService
  ) {}

  @Get()
  getHello(): string {
     console.log("current_env===>", this.configService.get('db'))
    return this.appService.getHello();
  }
}
