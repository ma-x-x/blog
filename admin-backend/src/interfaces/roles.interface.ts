export interface Role {
  id: number;
  name: string;
  code: string;
  sort: number;
  status: 1 | 0; //用户状态：1-正常 0-禁用
  deleted: 0 | 1; //逻辑删除标识：0-未删除；1-已删除
}
