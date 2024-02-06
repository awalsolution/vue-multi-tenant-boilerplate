import { ref } from 'vue';

export const formRules = ref({
  menu_name: {
    required: true,
    message: 'Please Enter Menu Name',
    trigger: 'blur'
  }
});
