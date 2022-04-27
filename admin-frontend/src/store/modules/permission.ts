import { PermissionState } from '@/types';
import { RouteRecordRaw } from 'vue-router';
import { defineStore } from 'pinia';
import { listRoutes } from '@/api/system/menu';

const usePermissionStore = defineStore({
  id: 'permission',
  state: (): PermissionState => ({
    routes: [],
  }),
  actions: {
    setRoutes(routes: RouteRecordRaw[]) {
      this.routes = routes;
    },
    generateRoutes() {
      return new Promise((resolve, reject) => {
        listRoutes()
          .then(response => {
            const asyncRoutes = response.data;
            this.setRoutes(asyncRoutes);
            resolve(asyncRoutes);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
  },
});

export default usePermissionStore;
