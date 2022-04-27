import { DictFormData, DictItemFormData, DictItemPageResult, DictItemQueryParam, Option } from '@/types';
import request from '@/utils/request';
import { AxiosPromise } from 'axios';

/**
 * 获取字典项
 *
 * @param queryParams
 */
export function listDictItem(): AxiosPromise<DictItemFormData[]> {
  return request({
    url: '/dicts',
    method: 'get',
  });
}

/**
 * 获取字典项分页列表
 *
 * @param queryParams
 */
export function listDictItemPages(queryParams?: DictItemQueryParam): AxiosPromise<DictItemPageResult> {
  return request({
    url: '/dicts',
    method: 'get',
    params: queryParams,
  });
}

/**
 * 根据字典编码获取字典项列表
 *
 * @param dictCode
 */
export function listDictsByCode(dictCode: string): AxiosPromise<Option[]> {
  return request({
    url: `/dicts/${dictCode}`,
    method: 'get',
    params: { dictCode: dictCode },
  });
}

/**
 * 获取字典项详情
 *
 * @param id
 */
export function getDictItemDetail(id: number): AxiosPromise<DictItemFormData> {
  return request({
    url: `/dicts/${id}`,
    method: 'get',
  });
}

/**
 * 新增字典项
 *
 * @param data
 */
export function addDictItem(data: DictFormData) {
  return request({
    url: `/dicts`,
    method: 'post',
    data: data,
  });
}

/**
 * 修改字典项
 *
 * @param id
 * @param data
 */
export function updateDictItem(id: number, data: DictFormData) {
  return request({
    url: `/dicts/${id}`,
    method: 'put',
    data: data,
  });
}

/**
 * 批量删除字典项
 * @param ids 字典项ID，多个以英文逗号(,)分割
 */
export function deleteDictItem(ids: string) {
  return request({
    url: `/dicts/${ids}`,
    method: 'delete',
  });
}
