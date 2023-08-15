export class IconUtils {
  static getDynamicIcon(iconSeries: string, iconKey: string): string {
    return `~icons/${iconSeries}/${iconKey}`;
  }
}
