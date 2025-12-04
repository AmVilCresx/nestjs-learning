import { EventSubscriber, EntitySubscriberInterface, InsertEvent } from 'typeorm';
import { SnowflakeService } from './snowflake.service';
import { Injectable } from '@nestjs/common';

@EventSubscriber()
export class SnowflakeSubscriber implements EntitySubscriberInterface<any> {
    
    private snowflakeService: SnowflakeService;

  constructor() {
    // 直接实例化，读取环境变量
    this.snowflakeService = new SnowflakeService();
  }

  // 监听所有实体的插入事件
  beforeInsert(event: InsertEvent<any>): void {
    const entity = event.entity;
    
    // 如果实体有 id 字段且为空，则生成雪花ID
    if (entity && (entity.id === undefined || entity.id === null)) {
      entity.id = this.snowflakeService.generateId();
    }
  }
}