import { defineStore } from 'pinia';
import { IS_SCREENLOCKED } from '@/store/mutation-types';
import { storage } from '@/utils/Storage';

// The default lock screen time without operation for a long time
const initTime = 60 * 60;

const isLocked = storage.get(IS_SCREENLOCKED, false);

export type IScreenLockState = {
  isLocked: boolean; // Whether to lock the screen
  lockTime: number;
};

export const useScreenLockStore = defineStore({
  id: 'app-screen-lock',
  state: (): IScreenLockState => ({
    isLocked: isLocked === true, // Whether to lock the screen
    lockTime: isLocked == 'true' ? initTime : 0,
  }),
  getters: {},
  actions: {
    setLock(payload: boolean) {
      this.isLocked = payload;
      storage.set(IS_SCREENLOCKED, this.isLocked);
    },
    setLockTime(payload = initTime) {
      this.lockTime = payload;
    },
  },
});
