import { ref } from 'vue';

export const formRules = ref({
  domain_name: {
    required: true,
    message: 'Please Enter Domain Name',
    trigger: 'blur'
  },
  phone_number: {
    required: true,
    message: 'Please Enter Phone',
    trigger: 'blur'
  },
  first_name: {
    required: true,
    message: 'Please Enter First Name',
    trigger: 'blur'
  },
  last_name: {
    required: true,
    message: 'Please Enter Last Name',
    trigger: 'blur'
  },
  password: {
    required: true,
    message: 'Please Enter Password',
    trigger: 'blur'
  },
  password_confirmation: {
    required: true,
    message: 'Please Enter Password Confirmation',
    trigger: 'blur'
  }
  // status: {
  //   required: true,
  //   message: 'Please Select Status',
  //   trigger: 'onchange'
  // },
});
