import { createI18n } from 'vue-i18n';

import en_US from '@src/locales/en_US.json';
import type { Lang, MessageSchema } from '@src/tools';

const i18n = createI18n<[MessageSchema], Lang>({
  legacy: false,
  locale: LangUtils.getDefaultLang() ?? 'en_US',
  fallbackLocale: 'en_US',
  messages: {
    en_US,
  },
});

export default i18n;
