<template>
  <Form v-slot="$form" :resolver="resolver" @submit="handleSubmit" class="form-wrapper" :class="formLayoutClasse">
    <div
      v-for="field in visibleFields"
      :key="field.name"
      class="form-field"
      :class="[field.class, getFieldColClass(field)]"
    >
      <FormField
        v-slot="$field"
        :name="field.name"
        :initialValue="modelValue[field.name]"
        :validateOnBlur="true"
        :validateOnValueUpdate="false"
      >
        <label :for="field.name" class="block font-bold mb-3">{{ field.label }}</label>

        <InputText
          v-if="field.type === 'text' || field.type === 'email'"
          :id="field.name"
          :type="field.type"
          :placeholder="field.placeholder"
          :disabled="field.disabled || loading"
          :readonly="field.readonly"
          :invalid="$field.invalid"
          fluid
        />

        <Password
          v-else-if="field.type === 'password'"
          :id="field.name"
          :placeholder="field.placeholder"
          :disabled="field.disabled || loading"
          :readonly="field.readonly"
          :invalid="$field.invalid"
          toggleMask
          fluid
        />

        <InputNumber
          v-else-if="field.type === 'number'"
          :id="field.name"
          :placeholder="field.placeholder"
          :disabled="field.disabled || loading"
          :readonly="field.readonly"
          :invalid="$field.invalid"
          fluid
        />

        <Select
          v-else-if="field.type === 'select'"
          :id="field.name"
          :options="field.options"
          :optionLabel="field.optionLabel || 'label'"
          :optionValue="field.optionValue || 'value'"
          :placeholder="field.placeholder"
          :disabled="field.disabled || loading"
          :invalid="$field.invalid"
          fluid
        />

        <MultiSelect
          v-else-if="field.type === 'multiselect'"
          :id="field.name"
          :options="field.options"
          :optionLabel="field.optionLabel || 'label'"
          :optionValue="field.optionValue || 'value'"
          :placeholder="field.placeholder"
          :disabled="field.disabled || loading"
          :invalid="$field.invalid"
          display="chip"
          fluid
        />

        <Textarea
          v-else-if="field.type === 'textarea'"
          :id="field.name"
          :rows="field.rows || 3"
          :autoResize="field.autoResize"
          :placeholder="field.placeholder"
          :disabled="field.disabled || loading"
          :readonly="field.readonly"
          :invalid="$field.invalid"
          fluid
        />

        <Checkbox
          v-else-if="field.type === 'checkbox'"
          :id="field.name"
          :binary="true"
          :disabled="field.disabled || loading"
          :invalid="$field.invalid"
        />

        <ToggleSwitch
          v-else-if="field.type === 'toggle'"
          :id="field.name"
          :disabled="field.disabled || loading"
          :invalid="$field.invalid"
        />

        <div v-else-if="field.type === 'radio'" class="flex flex-wrap gap-3">
          <div
            v-for="option in field.options"
            :key="option[field.optionValue || 'value']"
            class="flex items-center"
          >
            <RadioButton
              :id="`${field.name}-${option[field.optionValue || 'value']}`"
              :name="field.name"
              :value="option[field.optionValue || 'value']"
              :disabled="field.disabled || loading"
              :invalid="$field.invalid"
            />
            <label
              :for="`${field.name}-${option[field.optionValue || 'value']}`"
              class="ml-2"
            >
              {{ option[field.optionLabel || 'label'] }}
            </label>
          </div>
        </div>

        <DatePicker
          v-else-if="field.type === 'date'"
          :id="field.name"
          :placeholder="field.placeholder"
          :disabled="field.disabled || loading"
          :readonly="field.readonly"
          :invalid="$field.invalid"
          fluid
        />

        <Message v-if="$field.invalid" severity="error" size="small" variant="simple">
          {{ $field.error?.message }}
        </Message>
      </FormField>
    </div>

    <div v-if="showSubmit || showCancel" class="form-actions flex gap-3 mt-6">
      <Button
        v-if="showCancel"
        type="button"
        :label="cancelLabel || 'Cancel'"
        icon="pi pi-times"
        text
        @click="handleCancel"
        :disabled="loading"
      />
      <Button
        v-if="showSubmit"
        type="submit"
        :label="submitLabel || 'Save'"
        icon="pi pi-check"
        :loading="loading"
      />
    </div>
  </Form>
</template>

<script lang="ts" setup generic="T extends Record<string, any>">
import { computed } from 'vue';
import { Form, FormField } from '@primevue/forms';
import { zodResolver } from '@primevue/forms/resolvers/zod';
import type { FormField as FormFieldType, FormProps } from './types';

const props = withDefaults(defineProps<FormProps<T>>(), {
  loading: false,
  layout: 'vertical',
  columns: 1,
  showCancel: true,
  showSubmit: true,
});

const emit = defineEmits<{
  'update:modelValue': [value: T];
  submit: [value: T];
  cancel: [];
}>();

const resolver = computed(() => zodResolver(props.schema));

const visibleFields = computed(() => {
  return props.fields.filter((field) => {
    if (typeof field.visible === 'function') {
      return field.visible(props.modelValue);
    }
    return field.visible !== false;
  });
});

const formLayoutClasse = computed(() => {
  if (props.layout === 'grid') {
    return 'form-grid';
  }
  return 'form-vertical';
});

const getFieldColClass = (field: FormFieldType): string => {
  if (props.layout === 'grid' && field.cols) {
    return `col-span-${field.cols}`;
  }
  return '';
};

const handleSubmit = (event: { valid: boolean; values: Record<string, any> }) => {
  if (event.valid) {
    emit('submit', event.values as T);
  }
};

const handleCancel = () => {
  emit('cancel');
};
</script>

<style scoped>
.form-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-vertical {
  display: flex;
  flex-direction: column;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(v-bind(columns), 1fr);
  gap: 1.5rem;
}

.form-field {
  display: flex;
  flex-direction: column;
}

.form-actions {
  justify-content: flex-end;
}
</style>
