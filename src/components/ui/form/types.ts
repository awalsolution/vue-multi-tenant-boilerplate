import type { z } from 'zod';

export interface FormField {
  name: string;
  label: string;
  type:
    | 'text'
    | 'email'
    | 'password'
    | 'number'
    | 'select'
    | 'multiselect'
    | 'textarea'
    | 'checkbox'
    | 'toggle'
    | 'radio'
    | 'date';

  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;

  options?: Array<Record<string, any>>;
  optionLabel?: string;
  optionValue?: string;

  rows?: number;
  autoResize?: boolean;

  class?: string;
  cols?: number;

  visible?: boolean | ((formData: any) => boolean);
}

export interface FormProps<T = any> {
  schema: z.ZodSchema<T>;
  fields: FormField[];
  modelValue: T;
  loading?: boolean;
  layout?: 'vertical' | 'grid';
  columns?: number;
  submitLabel?: string;
  cancelLabel?: string;
  showCancel?: boolean;
  showSubmit?: boolean;
}

export interface FormEmits<T = any> {
  'update:modelValue': [value: T];
  submit: [value: T];
  cancel: [];
}
