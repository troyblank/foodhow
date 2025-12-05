import React, { type FunctionComponent } from 'react';
import { Spinner } from '..';
import styles from './button.module.css';

type ButtonProps = {
    text: string;
    buttonClickHand: () => void;
    isPending?: boolean;
};

export const Button: FunctionComponent<ButtonProps> = ({ text, buttonClickHand, isPending = false }) => {
    function onClick() {
        if (!isPending) {
            buttonClickHand();
        }
    }

    return (
      <button
        className={`${styles.button} ${isPending ? styles['button--pending'] : ''}`}
        onClick={onClick}
        aria-label={isPending ? 'Pending...' : text}
        aria-busy={isPending}
        disabled={isPending}
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
