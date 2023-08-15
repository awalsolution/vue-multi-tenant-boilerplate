import * as XLSX from 'xlsx';

import type { HeaderItem } from '@src/types';

export class ExcelUtils {
  static export(header: HeaderItem[], data: any, filename: string) {
    if (data.length === 0) {
      return;
    }

    const dataArray = [];
    const itemWidth: { width: number }[] = [];
    const itemHeader: string[] = [];

    header.forEach((headerItem) => {
      if (!headerItem.ignore) {
        itemHeader.push(headerItem.key);
        itemWidth.push({ width: headerItem.width });
      }
    });

    dataArray.push(itemHeader);

    data.forEach((item: any) => {
      const newItem = itemHeader.map((i) => item[i]);
      dataArray.push(newItem);
    });

    const exportFileName = `${filename}.xlsx`;
    const wsName = 'SheetJS';
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(dataArray);

    ws['!cols'] = itemWidth;

    XLSX.utils.book_append_sheet(wb, ws, wsName);
    XLSX.writeFile(wb, exportFileName);
  }
}
