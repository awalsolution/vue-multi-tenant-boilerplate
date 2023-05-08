import { defineStore } from 'pinia';

export type IProductState = {
  title: string;
  product_sku: string;
  slug: string;
  description: string;
  short_description: string;
  price: number;
  sale_price: number;
  is_active: boolean;
  product_images: string;
};

export const useProductStore = defineStore({
  id: 'app-products',
  state: (): IProductState => ({
    title: '',
    product_sku: '',
    slug: '',
    description: '',
    short_description: '',
    price: 10,
    sale_price: 0,
    is_active: true,
    product_images: '',
  }),
  getters: {},
  actions: {
    getProducts() {},
    getProduct() {},
    createProduct() {},
    updateProduct() {},
    deleteProduct() {},
  },
});
