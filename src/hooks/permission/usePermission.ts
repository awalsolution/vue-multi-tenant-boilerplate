import { useUserStore } from '@src/store/modules/user';
import { isSuperAdmin } from '@src/checks/isSuperAdmin';

export function usePermission() {
  const userStore = useUserStore();

  function _somePermissions(accesses: string[]) {
    return userStore.permissions.some((item: any) => {
      return accesses.includes(item);
    });
  }

  function hasPermission(accesses: string[]): boolean {
    if (isSuperAdmin()) {
      return true;
    } else {
      return _somePermissions(accesses);
    }
  }

  return { hasPermission };
}
