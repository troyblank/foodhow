import React, { type FunctionComponent } from 'react';
import { Spinner } from '..';
import styles from './button.module.css';

type ButtonProps = {
    text: string;
    buttonClickHand: () => void;
    isPending?: boolean;
    disabled?: boolean;
};

export const Button: FunctionComponent<ButtonProps> = ({ text, buttonClickHand, isPending = false, disabled = false }) => {
    const isDisabled = isPending || disabled;

    function onClick() {
        if (!isDisabled) {
            buttonClickHand();
        }
    }

    return (
      <button
        className={`${styles.button} ${isDisabled ? styles['button--disabled'] : ''}`}
        onClick={onClick}
        aria-label={isPending ? 'Pending...' : text}
        aria-busy={isPending}
        disabled={isDisabled}
        type={'button'}
      >
        {isPending ? (
          <Spinner size={'small'} />
        ) : (
          text
        )}
      </button>
    );
};
