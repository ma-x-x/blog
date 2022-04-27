import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '@config';
import { Response } from 'express';
import { NextFunction } from 'express';
import { HttpException } from '@/exceptions/HttpException';
import { PaginationRequest } from '@/interfaces/base.interface';
import { User } from '@interfaces/users.interface';

export const jwtUnlessPath = ['/login', '/signup'];

/**
 * 转化分页参数
 */
export default function () {
  return async function pageParse(req: PaginationRequest, res: Response, next: NextFunction) {
    const { pageNum, pageSize }: any = req.query;
    if (pageNum && pageSize) {
      const limit: any = Number(pageSize);
      const offset: any = (pageNum - 1) * limit;
      req.query = { ...req.query, limit, offset };
    }
    next();
  };
}
