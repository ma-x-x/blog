import { MenuFormData, MenuItem, MenuQueryParam, Option } from '@/types';
import request from '@/utils/request';
import { AxiosPromise } from 'axios';

/**
 * 获取路由列表
 */
export function listRoutes() {
  return request({
    url: '/current/menus',
    method: 'get',
  });
}

/**
 * 获取菜单表格列表
 *
 * @param queryParams
 */
export function listTableMenus(queryParams: MenuQueryParam): AxiosPromise<MenuItem[]> {
  return request({
    url: '/menus',
    method: 'get',
    params: queryParams,
  });
}

/**
 * 获取菜单下拉列表
 */
export function listSelectMenus(): AxiosPromise<Option[]> {
  return request({
    url: '/menus/select',
    method: 'get',
  });
}

/**
 * 获取菜单详情
 * @param id
 */
export function getMenuFormDetail(id: number): AxiosPromise<MenuFormData> {
  return request({
    url: `/menus/${id}`,
    method: 'get',
  });
}

/**
 * 添加菜单
 *
 * @param data
 */
export function addMenu(data: MenuFormData) {
  return request({
    url: '/menus',
    method: 'post',
    data: data,
  });
}

/**
 * 修改菜单
 *
 * @param id
 * @param data
 */
export function updateMenu(id: number, data: MenuFormData) {
  return request({
    url: `/menus/${id}`,
    method: 'put',
    data: data,
  });
}

/**
 * 批量删除菜单
 *
 * @param ids 菜单ID，多个以英文逗号(,)分割
 */
export function deleteMenus(ids: string) {
  return request({
    url: `/menus/${ids}`,
    method: 'delete',
  });
}
