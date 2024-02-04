import { ref } from 'vue';

export const formRules = ref({
  company_name: {
    required: true,
    message: 'Please Enter Name',
    trigger: 'blur'
  },
  phone_number: {
    required: true,
    message: 'Please Enter Phone',
    trigger: 'blur'
  },
  address: {
    required: true,
    message: 'Please Enter Address',
    trigger: 'blur'
  },
  city: {
    required: true,
    message: 'Please Enter City',
    trigger: 'blur'
  },
  state: {
    required: true,
    message: 'Please Enter State',
    trigger: 'blur'
  },
  country: {
    required: true,
    message: 'Please Enter Country',
    trigger: 'blur'
  },
  // status: {
  //   required: true,
  //   message: 'Please Select Status',
  //   trigger: 'onchange'
  // },
  logo: {
    required: true,
    message: 'Please Upload Logo',
    trigger: 'blur'
  }
});
