import { Request } from 'express';

export interface Pagination {
  offset: number;
  limit: number;
}

export interface PaginationRequest extends Request, Pagination {
  pageNum: number;
  pageSize: number;
}
