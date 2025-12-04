import SnowflakeId from 'snowflake-id';

export class SnowflakeService {
  private snowflake: any;

  constructor() {
    const mid = Number.parseInt(process.env.SNOWFLAKE_MACHINE_ID ?? '1', 10);
    // 使用 snowflake-id 库
    const EPOCH_2020 = Date.UTC(2020, 0, 1); // 2020-01-01 UTC 毫秒
    this.snowflake = new SnowflakeId({
      mid: mid,
      offset: EPOCH_2020,
    });
  }

  generateId(): string {
    return this.snowflake.generate();
  }
}
