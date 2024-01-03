import { ref } from 'vue';

export const formRules = ref({
  name: {
    required: true,
    message: 'Please Enter Name',
    trigger: 'blur'
  },
  menu_id: {
    required: true,
    message: 'Please select Menu Type',
    trigger: 'blur'
  },
  type: {
    required: true,
    message: 'Please select Permission Type',
    trigger: 'blur'
  }
});
