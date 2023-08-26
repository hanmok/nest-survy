import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { camelCase } from 'lodash'; // lodash의 camelCase 함수 사용

@Injectable()
export class CamelCaseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(map((data) => this.transformKeysToCamelCase(data)));
  }

  private transformKeysToCamelCase(data: any): any {
    if (Array.isArray(data)) {
      return data.map((item) => this.transformKeysToCamelCase(item));
    } else if (data !== null && typeof data === 'object') {
      const transformedData = {};
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          transformedData[camelCase(key)] = this.transformKeysToCamelCase(
            data[key],
          );
        }
      }
      return transformedData;
    }
    return data;
  }
}
