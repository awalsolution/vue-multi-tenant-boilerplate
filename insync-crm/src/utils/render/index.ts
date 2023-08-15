import type { MessageKeySchema } from '@src/types';

const { t: renderT } = i18n.global;

export class RenderUtils {
  static renderMenuLabel(label: string | (() => string)) {
    return () =>
      h(
        NEllipsis,
        {
          tooltip: {
            placement: 'right',
            showArrow: false,
          },
          class: 'select-none',
        },
        {
          default: label,
        }
      );
  }

  static renderIcon(icon: any, size: number = 16, options?: any) {
    return () =>
      h(
        NIcon,
        {
          size,
          ...options,
        },
        {
          default: () => h(icon),
        }
      );
  }

  static t(key: MessageKeySchema) {
    return () => renderT(key);
  }
}
