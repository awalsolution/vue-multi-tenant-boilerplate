import type { DialogOptions } from 'naive-ui/lib/dialog';
/**
 * @description: The method of exposing the pop-up window to the outside world
 */
export interface ModalMethods {
  setProps: (props) => void;
  openModal: () => void;
  closeModal: () => void;
  setSubLoading: (status) => void;
}

/**
 * Support modification, DialogOptions parameter
 */
export type ModalProps = DialogOptions;

export type RegisterFn = (ModalInstance: ModalMethods) => void;

export type UseModalReturnType = [RegisterFn, ModalMethods];
