import { JwtService } from '@nestjs/jwt';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { Request, Response } from 'express';
import logObject from './util/logObject';
import { access } from 'fs';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly JwtService: JwtService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const accessToken = req.headers.authorization?.replace('Bearer ', '');

    if (!accessToken) {
      return res
        .status(401)
        .json({ message: 'Unauthorized: Access token missing' });
    }

    try {
      const decoded = this.JwtService.verify(accessToken, {
        secret: '046e13dae9c744286aea80fc54f6f203b1a15e36',
      });
      //   logObject('decoded', decoded);
      req['user'] = decoded; // { userId, iat, exp } // issued at, expire Date
      console.log('user', req['user']);
      next();
    } catch (error) {
      return res
        .status(401)
        .json({ message: 'Unauthorized: Invalid access Token' });
    }
  }
}
