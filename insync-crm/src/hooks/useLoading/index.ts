import type { LoadingDispatcher } from '@src/hooks/useLoading/type';

export const useLoading = (defaultStatus: boolean = false): [Ref<boolean>, LoadingDispatcher] => {
  const loading = ref(defaultStatus);

  const dispatcher: LoadingDispatcher = {
    loading: () => {
      loading.value = true;
    },
    loaded: () => {
      loading.value = false;
    },
  };

  return [loading, dispatcher];
};
