import { useUserStore } from '@src/store/modules/user';

export function usePermission() {
  const userStore = useUserStore();

  /**
   * Check permissions
   * @param accesses
   */
  function _somePermissions(accesses: string[]) {
    return userStore.permissions.some((item: any) => {
      // const { value }: any = item;
      // return accesses.includes(value);
      return accesses.includes(item);
    });
  }

  /**
   * Determine whether permissions exist
   * Can be used for v-if display logic
   * */
  function hasPermission(accesses: string[]): boolean {
    if (!accesses || !accesses.length) return true;
    if (userStore.user.user_type === 'super admin') {
      return true;
    } else {
      return _somePermissions(accesses);
    }
  }

  return { hasPermission };
}
