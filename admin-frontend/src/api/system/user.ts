import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { UserFormData, UserInfo, UserPageResult, UserQueryParam } from '@/types';

/**
 * 登录成功后获取用户信息（昵称、头像、权限集合和角色集合）
 */
export function getUserInfo(): AxiosPromise<UserInfo> {
  return request({
    url: '/login-info',
    method: 'get',
  });
}

/**
 * 获取用户分页列表
 *
 * @param queryParams
 */
export function listUsersPage(queryParams: UserQueryParam): AxiosPromise<UserPageResult> {
  return request({
    url: '/users',
    method: 'get',
    params: queryParams,
  });
}

/**
 * 获取用户表单详情
 *
 * @param userId
 */
export function getUserFormDetail(userId: number): AxiosPromise<UserFormData> {
  return request({
    url: `/users/${userId}`,
    method: 'get',
  });
}

/**
 * 添加用户
 *
 * @param data
 */
export function addUser(data: any) {
  return request({
    url: '/users',
    method: 'post',
    data: data,
  });
}

/**
 * 修改用户
 *
 * @param userId
 * @param data
 */
export function updateUser(userId: number, data: UserFormData) {
  return request({
    url: `/users/${userId}`,
    method: 'put',
    data: data,
  });
}

/**
 * 选择性修改用户
 *
 * @param userId
 * @param data
 */
export function updateUserPart(userId: number, data: any) {
  return request({
    url: `/users/${userId}`,
    method: 'patch',
    data: data,
  });
}

/**
 * 删除用户
 * @param ids
 */
export function deleteUsers(ids: string) {
  return request({
    url: `/users/${ids}`,
    method: 'delete',
  });
}
