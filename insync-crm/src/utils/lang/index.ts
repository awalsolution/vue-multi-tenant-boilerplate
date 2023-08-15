import { dateEnUS, enUS } from 'naive-ui';

import type { Lang } from '@src/types';

export class LangUtils {
  private static LOCAL_STORAGE_LANG = 'lang';

  static getLang() {
    return localStorage.getItem(this.LOCAL_STORAGE_LANG);
  }

  static setLang(lang: Lang) {
    localStorage.setItem(this.LOCAL_STORAGE_LANG, lang);
  }

  static clearLang() {
    localStorage.removeItem(this.LOCAL_STORAGE_LANG);
  }

  static getBrowserLang() {
    const lang = window.navigator.language;
    if (lang.includes('en')) return 'en_US';
    return '';
  }

  static getDefaultLang() {
    const lang = this.getLang();
    const browserLang = this.getBrowserLang();

    return lang ?? browserLang ?? 'en_US';
  }

  static getDefaultLocale() {
    const lang = this.getDefaultLang();
    switch (lang) {
      case 'en_US':
        return enUS;
      default:
        return enUS;
    }
  }

  static getDefaultDateLocale() {
    const lang = this.getDefaultLang();
    switch (lang) {
      case 'en_US':
        return dateEnUS;
      default:
        return dateEnUS;
    }
  }
}
