import { LoginFormData, LoginResponseData } from '@/types';
import request from '@/utils/request';
import { AxiosPromise } from 'axios';

/**
 * 登录
 * @param data
 */
export function login(data: LoginFormData): AxiosPromise<LoginResponseData> {
  return request({
    url: '/login',
    method: 'post',
    data,
  });
}

/**
 * 注销
 */
export function logout() {
  return request({
    url: '/logout',
    method: 'delete',
  });
}
