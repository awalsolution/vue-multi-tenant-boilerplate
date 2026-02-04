<template>
  <div class="data-table-wrapper">
    <DataTable
      :value="value"
      :dataKey="dataKey"
      :stripedRows="stripedRows"
      :scrollable="scrollable"
      :size="size"
      :loading="loading"
      v-bind="$attrs"
    >
      <template #empty>
        <div class="text-center">{{ emptyMessage || 'No records found.' }}</div>
      </template>

      <template #loading>
        <div class="flex flex-col gap-4">
          <div v-for="i in 5" :key="i" class="flex gap-4 items-center">
            <Skeleton v-for="col in visibleColumns.length + (visibleActions.length > 0 ? 1 : 0)" :key="col" height="2rem" class="flex-1" />
          </div>
        </div>
      </template>

      <Column
        v-for="(column, index) in visibleColumns"
        :key="index"
        :field="String(column.field)"
        :header="column.header"
        :sortable="column.sortable"
        :class="column.class"
        :style="column.style"
      >
        <template #body="{ data }">
          <template v-if="column.body">
            <component :is="column.body(data)" />
          </template>
          <template v-else-if="column.format">
            {{ formatValue(data[column.field], column.format) }}
          </template>
          <template v-else>
            {{ data[column.field] }}
          </template>
        </template>
      </Column>

      <Column
        v-if="visibleActions.length > 0"
        :header="actionsLabel || 'Actions'"
        class="whitespace-nowrap"
        v-permission="{ action: actionsPermissions }"
      >
        <template #body="{ data }">
          <template v-for="(action, index) in visibleActions" :key="index">
            <Button
              v-if="isActionVisible(action, data)"
              :label="action.label"
              :icon="action.icon"
              :severity="action.severity"
              :outlined="action.outlined"
              :rounded="action.rounded"
              :disabled="isActionDisabled(action, data)"
              class="mr-2"
              @click="action.onClick(data, $event)"
              v-permission="{ action: action.permissions }"
            />
          </template>
        </template>
      </Column>
    </DataTable>

    <Paginator
      v-if="paginator"
      :rows="rows || 10"
      :totalRecords="totalRecords || value.length"
      :rowsPerPageOptions="rowsPerPageOptions || [10, 20, 30, 40, 50]"
      @page="onPageChange"
      template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown JumpToPageDropdown"
      :currentPageReportTemplate="`Showing {first} to {last} of {totalRecords} records`"
    />
  </div>
</template>

<script lang="ts" setup generic="T = any">
import { computed } from 'vue';
import { DataTable as PrimeDataTable, Column, Paginator, Button, Skeleton } from 'primevue';
import type { ColumnDefinition, ActionButton, PageEvent } from './types';

const DataTable = PrimeDataTable;

interface Props {
  value: T[];
  dataKey: string;
  columns: ColumnDefinition<T>[];
  loading?: boolean;
  paginator?: boolean;
  totalRecords?: number;
  rows?: number;
  rowsPerPageOptions?: number[];
  actions?: ActionButton<T>[];
  actionsLabel?: string;
  actionsPermissions?: string[];
  stripedRows?: boolean;
  scrollable?: boolean;
  size?: 'small' | 'large';
  emptyMessage?: string;
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  paginator: true,
  stripedRows: true,
  scrollable: true,
  actions: () => [],
  actionsPermissions: () => [],
});

const emit = defineEmits<{
  pageChange: [event: PageEvent];
}>();

const visibleColumns = computed(() => {
  return props.columns.filter((column) => !column.hidden);
});

const visibleActions = computed(() => {
  return props.actions || [];
});

const isActionVisible = (action: ActionButton<T>, data: T): boolean => {
  if (typeof action.visible === 'function') {
    return action.visible(data);
  }
  return action.visible !== false;
};

const isActionDisabled = (action: ActionButton<T>, data: T): boolean => {
  if (typeof action.disabled === 'function') {
    return action.disabled(data);
  }
  return action.disabled === true;
};

const formatValue = (value: any, format: ColumnDefinition['format']): string => {
  if (!value) return '';

  if (typeof format === 'function') {
    return format(value);
  }

  switch (format) {
    case 'date':
      return new Date(value).toLocaleDateString();
    case 'currency':
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
    case 'number':
      return new Intl.NumberFormat('en-US').format(value);
    default:
      return String(value);
  }
};

const onPageChange = (event: PageEvent) => {
  emit('pageChange', event);
};
</script>

<style scoped>
.data-table-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
