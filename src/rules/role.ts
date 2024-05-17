import { ref } from 'vue';

export const postRules = ref({
  title: {
    required: true,
    message: 'Please Enter title',
    trigger: 'blur'
  },
  description: {
    required: true,
    message: 'Please Enter description',
    trigger: 'blur'
  },
  status: {
    required: true,
    message: 'Please Enter status',
    trigger: 'blur'
  }
});
