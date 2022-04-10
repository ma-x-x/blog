import { createApp } from 'vue';
import App from './App.vue';
import ElementPlus from 'element-plus';
import store from '@/store';
import router from '@/router';
import zhCn from 'element-plus/es/locale/lang/zh-cn';

const app = createApp(App);

// 挂载pinia
app.use(store);

// 注册路由
app.use(router);

// 国际化
app.use(ElementPlus, {
  local: zhCn,
});

app.mount('#app');
