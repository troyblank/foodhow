import React, { type FunctionComponent } from 'react';
import { Button } from '..';
import styles from './modal.module.css';

type ModalProps = {
    message: string;
    isShowing: boolean;
    onConfirm: () => void;
    onCancel: () => void;
};

export const Modal: FunctionComponent<ModalProps> = ({
    message,
    isShowing,
    onConfirm,
    onCancel
}) => isShowing && (
  <div className={styles.overlay} onClick={onCancel}>
    <div
      className={styles.modal}
      onClick={(event) => event.stopPropagation()}
      role={'dialog'}
      aria-modal={'true'}
    >
      <p className={styles.message}>{message}</p>
      <div className={styles.actions}>
        <Button text={'Cancel'} buttonClickHand={onCancel} />
        <Button text={'Confirm'} buttonClickHand={onConfirm} />
      </div>
    </div>
  </div>
);
