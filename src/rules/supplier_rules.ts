import { ref } from 'vue';

export const rules = ref({
  supplier_name: {
    required: true,
    message: 'Please Enter Name',
    trigger: 'blur'
  },
  supplier_phone: {
    required: true,
    message: 'Please Enter Phone',
    trigger: 'blur'
  },
  supplier_email: {
    required: true,
    message: 'Please Enter Email',
    trigger: 'blur'
  },
  status: {
    required: true,
    message: 'Please Select status',
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
  }
});
