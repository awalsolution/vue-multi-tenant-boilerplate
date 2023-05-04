import { ComponentType } from '../../types/componentType';

/**
 * @description: generate placeholder
 */
export function createPlaceholderMessage(component: ComponentType) {
  if (component === 'NInput') return '请输入';
  if (
    ['NPicker', 'NSelect', 'NCheckbox', 'NRadio', 'NSwitch', 'NDatePicker', 'NTimePicker'].includes(
      component
    )
  )
    return 'please choose';
  return '';
}
