import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

export const Layout = () => import('@/layout/index.vue');

export const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'dashboard', affix: true },
      },
    ],
  },
  {
    path: '/system',
    component: Layout,
    children: [
      {
        path: 'user',
        component: () => import('@/views/system/user/index.vue'),
        name: 'user',
        meta: { title: '用户管理', icon: 'user' },
      },
      {
        path: 'role',
        component: () => import('@/views/system/role/index.vue'),
        name: 'role',
        meta: { title: '角色管理', icon: 'role' },
      },
      {
        path: 'menu',
        component: () => import('@/views/system/menu/index.vue'),
        name: 'menu',
        meta: { title: '菜单管理', icon: 'menu' },
      },
      {
        path: 'dict',
        component: () => import('@/views/system/dict/index.vue'),
        name: 'dict',
        meta: { title: '字典管理', icon: 'dict' },
      },
    ],
  },
  {
    path: '/redirect',
    component: Layout,
    meta: { hidden: true },
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index.vue'),
      },
    ],
  },
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    meta: { hidden: true },
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404.vue'),
    meta: { hidden: true },
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401.vue'),
    meta: { hidden: true },
  },
];

// 创建路由
const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes as RouteRecordRaw[],
  // 刷新时，滚动条位置还原
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

export default router;
