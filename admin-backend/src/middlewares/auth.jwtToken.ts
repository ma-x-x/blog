import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '@config';
import { Response } from 'express';
import { NextFunction } from 'express';
import { HttpException } from '@/exceptions/HttpException';
import { RequestWithUser } from '@/interfaces/auth.interface';
import { User } from '@interfaces/users.interface';

export const jwtUnlessPath = ['/login', '/signup'];

/**
 * 判断token是否可用
 */
export default function () {
  return async function jwtTokenParse(req: RequestWithUser, res: Response, next: NextFunction) {
    // 检测过滤的路由就不做解析JWT了
    if (jwtUnlessPath.find(item => item === req.url)) {
      await next();
      return false;
    }

    // 获取jwt
    const token = req.header('authorization');
    if (!token) {
      next(new HttpException(401, 'Token身份无效!'));
    }

    try {
      // 解密payload，获取用户名和ID
      let payload = jwt.verify(token.split(' ')[1], SECRET_KEY) as User;
      req.user = {
        username: payload.username,
        email: payload.email,
        id: payload.id,
      } as User;
      next();
    } catch (err) {
      next(new HttpException(401, 'Token身份无效!'));
    }
  };
}
