/**
 * 创建带优先级的守卫接口
 */

import { CanActivate } from '@nestjs/common';

export interface PriorityGuard extends CanActivate {
  priority: number;
}