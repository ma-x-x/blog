import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ElMessage, ElMessageBox } from 'element-plus';
import { localStorage } from '@/utils/storage';
import useStore from '@/store';

// 创建 axios 实例
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 50000,
  headers: { 'Content-Type': 'application/json;charset=utf-8' },
});

// 请求拦截器
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    if (!config.headers) {
      throw new Error(`Expected 'config' and 'config.headers' not to be undefined`);
    }
    const { user } = useStore();
    if (user.token) {
      config.headers.Authorization = `${localStorage.get('token')}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const { code, message } = response.data;
    if (code === '00000') {
      return response.data;
    } else {
      ElMessage({
        message: message || '系统出错',
        type: 'error',
      });
      return Promise.reject(new Error(message || 'Error'));
    }
  },
  error => {
    const status = error.response.status;
    const { code, message } = error.response.data;
    console.log('error: ', error);
    if (status === 404) {
      return ElMessage({
        message: '请求路径不存在',
        type: 'error',
      });
    } else if (code === '4011') {
      // token 过期
      localStorage.clear(); // 清除浏览器全部缓存
      window.location.href = '/'; // 跳转登录页
      ElMessageBox.alert('当前页面已失效，请重新登录', '提示', {})
        .then(() => {
          console.log('会话超时');
        })
        .catch(() => {
          console.log('会话超时');
        });
    } else {
      ElMessage({
        message: message || '系统出错',
        type: 'error',
      });
    }
    return Promise.reject(new Error(message || 'Error'));
  },
);

// 导出 axios 实例
export default service;
