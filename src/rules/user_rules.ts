import { ref } from 'vue';

export const formRules = ref({
  first_name: {
    required: true,
    message: 'Please Enter First Name',
    trigger: 'blur'
  },
  last_name: {
    required: true,
    message: 'Please Enter last Name',
    trigger: 'blur'
  },
  email: {
    required: true,
    message: 'Please Enter email',
    trigger: 'blur'
  },
  password: {
    required: true,
    message: 'Please Enter Password',
    trigger: 'blur'
  }
});
