import { App } from 'vue';

import { permission } from '@src/directives/permission';

export function setupDirectives(app: App) {
  // permission control command (demo)
  app.directive('permission', permission);
}
