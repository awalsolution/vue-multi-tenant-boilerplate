import { h } from 'vue';
import { MenuOption } from 'naive-ui';
import { RouteRecordRaw } from 'vue-router';
import { isExternal } from '@src/utils/common/is';
import { renderIcon } from '@src/utils/render';

export function transfromMenu(route: Array<RouteRecordRaw>): Array<MenuOption> {
  function getLabel(item: RouteRecordRaw) {
    if (isExternal(item.path as string)) {
      return () =>
        h(
          'a',
          {
            href: item.path,
            target: '_blank',
            rel: 'noopenner noreferrer',
          },
          (item.meta as any).title
        );
    }
    return item.meta?.title || '';
  }
  if (!route) {
    return [];
  }
  const tempMenus: Array<MenuOption> = [];
  route
    .filter((it) => {
      if (!it.meta) {
        return false;
      }
      return !it.meta.hidden;
    })
    .forEach((it) => {
      const tempMenu = {
        name: it.name,
        key: it.path,
        label: getLabel(it),
        icon: renderIcon(it.meta?.icon),
      } as MenuOption;

      if (it.children) {
        tempMenu.children = transfromMenu(it.children as RouteRecordRaw[]);
      }
      tempMenus.push(tempMenu);
    });
  return tempMenus;
}
