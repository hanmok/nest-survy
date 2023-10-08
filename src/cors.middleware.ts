// cors.middleware.ts
import { Request, Response, NextFunction } from 'express';

export function corsMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  res.header('Access-Control-Allow-Origin', '*'); // 모든 출처 허용, 보안에 취약
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // 실제 서버에서는 출처를 제한하고 필요한 헤더만 허용해야 합니다.
  // res.header('Access-Control-Allow-Origin', 'https://allowed-origin.com');
  // res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  next();
}
