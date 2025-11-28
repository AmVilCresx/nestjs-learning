import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { PriorityGuard } from './priority.guard';

@Injectable()
export class PriorityGuardExecutor implements CanActivate {
  constructor(private readonly guards: PriorityGuard[]) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // 按优先级排序 (数字小的先执行)
    const sortedGuards = this.guards.sort((a, b) => a.priority - b.priority);
    
    for (const guard of sortedGuards) {
      const result = await guard.canActivate(context);
      if (!result) {
        return false;
      }
    }
    
    return true;
  }
}