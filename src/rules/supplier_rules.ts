import { ref } from 'vue';

export const rules = ref({
  supplier_name: {
    required: true,
    message: 'Please Enter Name',
    trigger: 'blur'
  },
  supplier_company: {
    required: true,
    message: 'Please Enter Company',
    trigger: 'blur'
  },
  supplier_phone: {
    required: true,
    message: 'Please Enter Phone',
    trigger: 'blur'
  },
  supplier_email: {
    required: false,
    message: 'Please Enter Email',
    trigger: 'blur'
  },
  supplier_address: {
    required: true,
    message: 'Please Enter Address',
    trigger: 'blur'
  },
  supplier_city: {
    required: true,
    message: 'Please Enter City',
    trigger: 'blur'
  },
  supplier_state: {
    required: true,
    message: 'Please Enter State',
    trigger: 'blur'
  },
  supplier_country: {
    required: true,
    message: 'Please Enter Country',
    trigger: 'blur'
  },
  supplier_category: {
    required: false,
    message: 'Please select Category',
    trigger: 'blur'
  }
});
