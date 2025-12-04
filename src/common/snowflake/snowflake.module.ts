import { Module, Global } from '@nestjs/common';
import { SnowflakeService } from './snowflake.service';
import { SnowflakeSubscriber } from './entity-listener';

@Global()
@Module({
  providers: [ {
    provide: SnowflakeService,
    useFactory: () => {
        return new SnowflakeService();
    }
  }],
  exports: [SnowflakeService],
})
export class SnowflakeModule {}