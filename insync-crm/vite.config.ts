import { fileURLToPath, URL } from 'node:url';
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Icons from 'unplugin-icons/vite';
import Components from 'unplugin-vue-components/vite';
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const { VITE_PORT } = env as ImportMetaEnv;

  const port = parseInt(VITE_PORT, 10);
  return {
    base: '/',
    plugins: [
      vue(),
      AutoImport({
        dts: './src/types/auto-imports.d.ts',
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/,
          /\.vue\?vue/, // .vue
          /\.md$/, // .md
        ],
        imports: [
          'vue',
          'vue-router',
          'pinia',
          'vue-i18n',
          {
            'vue-router': ['RouterLink', 'RouterView'],
            '@vueuse/core': ['useToggle', 'useEventListener', 'useDebounceFn', 'useFullscreen'],
            axios: [['default', 'axios']],
            dayjs: [['default', 'dayjs']],
            'naive-ui': [
              'useDialog',
              'useMessage',
              'useNotification',
              'useLoadingBar',
              'createDiscreteApi',
              'NButton',
              'NTag',
              'NIcon',
              'NPopconfirm',
              'NInput',
              'NAvatar',
              'NImage',
              'NEllipsis',
            ],
          },
          {
            from: 'naive-ui',
            imports: [
              'DataTableBaseColumn',
              'DataTableColumn',
              'DataTableColumns',
              'DataTableCreateSummary',
              'DropdownOption',
              'FormInst',
              'FormItemInst',
              'FormItemRule',
              'FormRules',
              'FormValidationError',
              'MenuInst',
              'MenuOption',
              'UploadCustomRequestOptions',
              'UploadFileInfo',
              'UploadInst',
            ],
            type: true,
          },
          {
            from: '@src/constants',
            imports: ['siteMetaData', 'GlobalEnvConfig', 'BasePageModel'],
          },
          {
            from: '@src/i18n',
            imports: [['default', 'i18n']],
          },
        ],
        dirs: ['src/tools', 'src/utils', 'src/store'],
      }),
      Components({
        dts: './src/types/components.d.ts',
        resolvers: [NaiveUiResolver()],
        types: [
          {
            from: 'vue-router',
            names: ['RouterLink', 'RouterView'],
          },
        ],
        dirs: ['src/components'],
        extensions: ['vue'],
      }),
      Icons({ autoInstall: true }),
    ],
    resolve: {
      alias: {
        '@src': fileURLToPath(new URL('./src', import.meta.url)),
        /**
         * NOTE: Fix vue-i18n loader bug
         * @see https://github.com/intlify/vue-i18n-next/issues/789
         */
        'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
      },
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
    },

    server: {
      host: true,
      port,
      strictPort: true,
      open: false,
    },
    preview: {
      host: true,
      port,
      strictPort: true,
      open: false,
    },
  };
});
