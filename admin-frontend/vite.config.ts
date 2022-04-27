import { defineConfig, UserConfig, ConfigEnv, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import * as path from 'path';

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfig => {
  // 获取 .env 环境配置文件
  const env = loadEnv(mode, process.cwd());

  return {
    resolve: {
      //设置别名
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        // 指定symbolId格式
        symbolId: 'icon-[dir]-[name]',
      }),
    ],
    server: {
      open: true, // 运行自动打开浏览器
      hmr: {
        host: 'localhost',
        port: Number(env.VITE_APP_PORT),
      },
      // 设置 https 代理
      proxy: {
        [env.VITE_APP_BASE_API]: {
          target: 'http://localhost:8000',
          changeOrigin: true,
          rewrite: path => path.replace(new RegExp('^' + env.VITE_APP_BASE_API), ''),
        },
      },
    },
  };
};
