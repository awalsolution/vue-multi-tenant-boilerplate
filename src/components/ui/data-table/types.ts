import type { Component, VNode } from 'vue';

export interface PageEvent {
  page: number;
  first: number;
  rows: number;
  pageCount?: number;
}

export interface ColumnDefinition<T = any> {
  field: keyof T | string;
  header: string;
  sortable?: boolean;
  class?: string;
  style?: string | object;
  body?: (data: T) => VNode | string;
  bodyComponent?: Component;
  format?: 'date' | 'currency' | 'number' | ((value: any) => string);
  hidden?: boolean;
  permissions?: string[];
}

export interface ActionButton<T = any> {
  label: string;
  icon?: string;
  severity?: 'primary' | 'secondary' | 'success' | 'info' | 'warn' | 'danger';
  outlined?: boolean;
  rounded?: boolean;
  disabled?: boolean | ((data: T) => boolean);
  visible?: boolean | ((data: T) => boolean);
  permissions?: string[];
  onClick: (data: T, event?: Event) => void;
}

export interface DataTableProps<T = any> {
  value: T[];
  loading?: boolean;
  dataKey: string;
  columns: ColumnDefinition<T>[];
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
