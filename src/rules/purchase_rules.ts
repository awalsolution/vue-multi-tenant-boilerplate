import { ref } from 'vue';

export const rules = ref({
  expected_date: {
    required: true,
    message: 'Please select a date',
    trigger: 'blur'
  },
  status: {
    required: true,
    message: 'Please select status',
    trigger: 'blur'
  },
  order_type: {
    required: true,
    message: 'Please select Order Type',
    trigger: 'blur'
  },
  supplier_id: {
    type: 'number',
    required: true,
    message: 'Please Select Supplier',
    trigger: 'blur'
  },
  merchant_id: {
    type: 'number',
    required: true,
    message: 'Please Select Merchant_id',
    trigger: 'blur'
  },
  warehouse_id: {
    type: 'number',
    required: true,
    message: 'Please Select Warehouse',
    trigger: 'blur'
  },
  notes: {
    required: false,
    message: 'Please Enter notes',
    trigger: 'blur'
  }
});
