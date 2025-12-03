import * as common from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@common.Catch()
export class AllExceptionFilter implements common.ExceptionFilter {
  constructor(
    private readonly logger: common.LoggerService,
    private readonly httpAdapterHost: HttpAdapterHost,
  ) {}
  catch(exception: any, host: common.ArgumentsHost) {
    this.logger.error('发生异常', exception)
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const { httpAdapter } = this.httpAdapterHost;
    const status =
      exception instanceof common.HttpException
        ? exception.getStatus()
        : common.HttpStatus.INTERNAL_SERVER_ERROR;
    const message: unknown = exception['message'] || 'Internal Server Error';
    let mgs = message;
    if (message && typeof message === 'object' && 'message' in (message as any)) {
      mgs = message['message'];
    }
    const respBody = {
      code: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message: mgs,
    };
    
    this.logger.error('发生异常', respBody)
    response.status(status).json(respBody);
    httpAdapter.reply(response, respBody, status);
  }
}
