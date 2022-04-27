export interface Dict {
  id: number;
  dictName: string; //字典名称
  dictCode: string; // 字典编码
  name: string; // 字典项名称
  value: string; // 字典项值
  sort: number;
  status: 0 | 1; // 0 停用，1正常
  defaulted: 0 | 1; // 是否默认（0否 1是）
  remark: string; //备注
}
