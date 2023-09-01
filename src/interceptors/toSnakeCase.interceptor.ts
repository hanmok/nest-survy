// // snake-case.interceptor.ts

// import {
//   CallHandler,
//   ExecutionContext,
//   Injectable,
//   NestInterceptor,
// } from '@nestjs/common';
// import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';

// @Injectable()
// export class toSnakeCaseInterceptor implements NestInterceptor {
//   intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
//     return next.handle().pipe(
//       map((data) => {
//         if (Array.isArray(data)) {
//           return data.map((item) => this.transformKeys(item));
//         }
//         return this.transformKeys(data);
//       }),
//     );
//   }

//   private transformKeys(data: any): any {
//     console.log('transformKeys called');
//     if (!data) {
//       return data;
//     }
//     const transformedData = {};
//     for (const key of Object.keys(data)) {
//       console.log(`before snakeCase: ${key}`);
//       const transformedKey = key.replace(/([A-Z])/g, '_$1').toLowerCase();
//       console.log(`after snakeCase: ${transformedKey}`);
//       transformedData[transformedKey] = data[key];
//     }
//     return transformedData;
//   }
// }
