import { sentryVitePlugin } from '@sentry/vite-plugin';
import react from '@vitejs/plugin-react';
import * as process from 'node:process';
import { fileURLToPath } from 'node:url';
import { type UserConfig, defineConfig } from 'vite';
import { viteSingleFile } from 'vite-plugin-singlefile';
import svgr from 'vite-plugin-svgr';

export default ({ mode }): UserConfig => {
  return defineConfig({
    root: './ui-src',
    plugins: [
      svgr(),
      react(),
      viteSingleFile({ removeViteModuleLoader: true }),
      sentryVitePlugin({
        org: 'runroom-sl',
        project: 'penpot-exporter',
        disable: mode === 'development'
      })
    ],
    resolve: {
      tsconfigPaths: true,
      alias: {
        'react': 'preact/compat',
        'react-dom': 'preact/compat',
        '!../css/base.css': '../css/base.css',
        '@create-figma-plugin/ui': fileURLToPath(new URL('./shim/figma-plugin-ui', import.meta.url)),
        '@create-figma-plugin/ui/css/base.css': fileURLToPath(new URL('./ui-src/css/base.css', import.meta.url))
      }
    },
    build: {
      emptyOutDir: false,
      target: 'esnext',
      reportCompressedSize: false,
      outDir: '../dist',
      rollupOptions: {
        external: ['!../css/base.css']
      },
      sourcemap: true
    },
    define: {
      APP_VERSION: JSON.stringify(process.env.npm_package_version),
      __DEV__: JSON.stringify(mode === 'development')
    }
  });
};
