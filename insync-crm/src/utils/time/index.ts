import dayjs from 'dayjs';

import type { TimeFormatter } from '@src/types';

export class TimeUtils {
  static formatTime(time: string | number | Date, format: TimeFormatter = 'YYYY-MM-DD HH:mm:ss') {
    return dayjs(time).format(format);
  }
}
