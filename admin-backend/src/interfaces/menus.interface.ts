export interface Menu {
  id: number;
  name: string;
  parentId: string; // 父菜单ID
  path: string; // 路由路径
  component: string; // 组件路径
  icon: string; // 菜单图标
  sort: number;
  visible: 0 | 1; // 0 禁用，1开启
  redirect: string; //重定向路径
  meta: {
    title: string;
    icon: string;
    redirect: string;
  };
}
