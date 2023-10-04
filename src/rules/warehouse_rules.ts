import { ref } from 'vue';

export const rules = ref({
  warehouse_name: {
    required: true,
    message: 'Please Enter Name',
    trigger: 'blur'
  },
  warehouse_phone: {
    required: true,
    message: 'Please Enter Phone',
    trigger: 'blur'
  },
  status: {
    required: true,
    message: 'Please Select Status',
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
