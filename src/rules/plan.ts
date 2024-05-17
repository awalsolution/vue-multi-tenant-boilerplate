import { ref } from 'vue';

export const formRules = ref({
  name: {
    required: true,
    message: 'Please Enter Name',
    trigger: 'blur'
  },
  price: {
    required: true,
    message: 'Please Enter price',
    trigger: 'blur'
  },
  description: {
    required: true,
    message: 'Please Enter description',
    trigger: 'blur'
  }
});
