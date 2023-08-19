import { Logger } from '@nestjs/common/services';
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class HTTPLoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, _call: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    if (Object.keys(request.params || {}).length > 0) {
      Logger.debug(`Params: ${JSON.stringify(request.params)}`);
    }
    if (Object.keys(request.query || {}).length > 0) {
      Logger.debug(`Queries: ${JSON.stringify(request.query)}`);
    }
    if (Object.keys(request.body || {}).length > 0) {
      const body = JSON.stringify(request.body).replace(
        /"password":".*?"/g,
        '"password":"[MASKED]"',
      );
      Logger.debug(`Body: ${body}`);
    }

    return _call.handle().pipe();
  }
}
