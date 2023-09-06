import path from 'path';
import fs from 'fs';
import { defineConfig, loadEnv } from 'vite';
import vitePluginImp from 'vite-plugin-imp';
import { visualizer } from 'rollup-plugin-visualizer';
import lessToJS from 'less-vars-to-js';
import viteAntdDayjs from 'vite-plugin-antd-dayjs';
import react from '@vitejs/plugin-react';
import VitePluginHtmlEnv from 'vite-plugin-html-env';
import svgr from 'vite-plugin-svgr';

const themeVariables = lessToJS(
  fs.readFileSync(
    path.resolve(__dirname, './src/configs/theme/index.less'),
    'utf8',
  ),
);

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return defineConfig({
    plugins: [
      svgr(),
      react(),
      viteAntdDayjs(),
      VitePluginHtmlEnv(),
      vitePluginImp({
        libList: [
          {
            libName: 'antd',
            style: name => {
              if (name === 'col' || name === 'row') {
                return 'antd/lib/style/index.less';
              }
              return `antd/es/${name}/style/index.less`;
            },
          },
        ],
      }),
    ],
    
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          modifyVars: themeVariables,
        },
      },
    },
    resolve: {
      alias: [
        {
          find: './runtimeConfig',
          replacement: './runtimeConfig.browser',
        },
        {
          find: /^#/,
          replacement: path.resolve(__dirname, 'src'),
        },
        { find: /^~/, replacement: '' },
      ],
    },
    optimizeDeps: {
      include: ['@ant-design/icons', '@ant-design/icons'],
    },
    build: {
      sourcemap: false,
      outDir: 'build',
      rollupOptions: {
        plugins: [visualizer()],
      },
    },
  });
};
