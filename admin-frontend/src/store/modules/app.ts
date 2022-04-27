import { AppState, Dict } from '@/types';
import { localStorage } from '@/utils/storage';
import { defineStore } from 'pinia';
import { getLanguage } from '@/lang/index';
import { listDictItem } from '@/api/system/dict';
import { groupBy } from 'lodash-es';

const useAppStore = defineStore({
  id: 'app',
  state: (): AppState => ({
    device: 'desktop',
    sidebar: {
      opened: localStorage.get('sidebarStatus') ? !!+localStorage.get('sidebarStatus') : true,
      withoutAnimation: false,
    },
    language: getLanguage(),
    size: localStorage.get('size') || 'default',
    dicts: {},
  }),
  actions: {
    toggleSidebar() {
      this.sidebar.opened = !this.sidebar.opened;
      this.sidebar.withoutAnimation = false;
      if (this.sidebar.opened) {
        localStorage.set('sidebarStatus', 1);
      } else {
        localStorage.set('sidebarStatus', 0);
      }
    },
    closeSideBar(withoutAnimation: any) {
      localStorage.set('sidebarStatus', 0);
      this.sidebar.opened = false;
      this.sidebar.withoutAnimation = withoutAnimation;
    },
    toggleDevice(device: string) {
      this.device = device;
    },
    setSize(size: string) {
      this.size = size;
      localStorage.set('size', size);
    },
    setLanguage(language: string) {
      this.language = language;
      localStorage.set('language', language);
    },
    setDicts(dicts: { [key: string]: Dict[] }) {
      this.dicts = dicts;
    },
    getDicts() {
      return new Promise((resolve, reject) => {
        listDictItem()
          .then(response => {
            const dicts = response.data;
            const dictMap = groupBy(dicts, 'dictCode');
            this.setDicts(dictMap as any);
            resolve(dicts);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
  },
});

export default useAppStore;
