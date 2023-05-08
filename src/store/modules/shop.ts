import { defineStore } from 'pinia';

export type IShopState = {
  shop_name: string;
  shop_phone: string;
  address: string;
  city: string;
  state: string;
  country: string;
  shop_logo: string;
};

export const useShopStore = defineStore({
  id: 'app-shop',
  state: (): IShopState => ({
    shop_name: '',
    shop_phone: '',
    address: '',
    city: '',
    state: '',
    country: '',
    shop_logo: '',
  }),
  getters: {},
  actions: {
    getShops() {},
    getShop() {},
    createShop() {},
    updateShop() {},
    deleteShop() {},
  },
});
