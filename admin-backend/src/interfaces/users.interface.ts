import { RequestWithUser } from './auth.interface';
import { Pagination } from './base.interface';

export interface User {
  id: number;
  username: string;
  password?: string;
  email: string;
  nickname: string;
  gender: 1 | 2;
  avatar: string;
  mobile: number;
  status: 1 | 0;
  deleted: 0 | 1;
}

export interface RequestWithUserPage extends RequestWithUser, Pagination {
  keywords: string;
  status: number;
}
