import { ref } from 'vue';

export const formRules = ref({
  email: {
    required: true,
    message: 'Please Enter Email',
    trigger: 'blur'
  },
  password: {
    required: true,
    message: 'Please Enter Password',
    trigger: 'blur'
  }
});
