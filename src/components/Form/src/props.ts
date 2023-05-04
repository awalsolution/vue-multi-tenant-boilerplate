import type { CSSProperties, PropType } from 'vue';
import { FormSchema } from './types/form';
import type { GridProps, GridItemProps } from 'naive-ui/lib/grid';
import type { ButtonProps } from 'naive-ui/lib/button';
import { propTypes } from '@/utils/propTypes';
export const basicProps = {
  // label width fixed width
  labelWidth: {
    type: [Number, String] as PropType<number | string>,
    default: 80,
  },
  // form configuration rules
  schemas: {
    type: [Array] as PropType<FormSchema[]>,
    default: () => [],
  },
  // layout method
  layout: {
    type: String,
    default: 'inline',
  },
  //Whether to display as an inline form
  inline: {
    type: Boolean,
    default: false,
  },
  //size
  size: {
    type: String,
    default: 'medium',
  },
  // label position
  labelPlacement: {
    type: String,
    default: 'left',
  },
  //Whether the component has a width of 100%
  isFull: {
    type: Boolean,
    default: true,
  },
  //Whether to display the operation button (query/reset)
  showActionButtonGroup: propTypes.bool.def(true),
  // show reset button
  showResetButton: propTypes.bool.def(true),
  // reset button configuration
  resetButtonOptions: Object as PropType<Partial<ButtonProps>>,
  // show confirm button
  showSubmitButton: propTypes.bool.def(true),
  // confirm button configuration
  submitButtonOptions: Object as PropType<Partial<ButtonProps>>,
  //Expand and collapse button
  showAdvancedButton: propTypes.bool.def(true),
  // confirm button text
  submitButtonText: {
    type: String,
    default: 'Query',
  },
  // reset button text
  resetButtonText: {
    type: String,
    default: 'reset',
  },
  //grid configuration
  gridProps: Object as PropType<GridProps>,
  //gi configuration
  giProps: Object as PropType<GridItemProps>,
  //grid style
  baseGridStyle: {
    type: Object as PropType<CSSProperties>,
  },
  //whether to fold
  collapsed: {
    type: Boolean,
    default: false,
  },
  //Number of rows displayed by default
  collapsedRows: {
    type: Number,
    default: 1,
  },
};
