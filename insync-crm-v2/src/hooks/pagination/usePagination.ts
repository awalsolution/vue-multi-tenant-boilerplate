import { ref, watch } from 'vue';

export const usePagination = (data: any) => {
  const itemCount = ref(0);
  const pageSizes = ref([10, 20, 30, 40, 50, 100]);
  const pageSize = ref(10);
  const page = ref(1);

  itemCount.value = data.meta?.total;

  watch([page, pageSize], (value, oldValue) => {
    page.value = value[1] !== oldValue[1] ? 1 : page.value;
  });

  return { page, pageSize, pageSizes, itemCount };
};
