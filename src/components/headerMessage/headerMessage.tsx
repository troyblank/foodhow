import React, { type FunctionComponent } from 'react';
import styles from './headerMessage.module.css';

type HeaderMessageProps = {
    headline: string;
    message: string;
};

export const HeaderMessage: FunctionComponent<HeaderMessageProps> = ({ headline, message }) => {
    if (0 === headline.length && 0 === message.length) {
        return null;
    }

    return (
      <div className={styles['header-message']}>
        <h1 className={styles['header-message__headline']}>{headline}</h1>
        <p className={styles['header-message__text']}>{message}</p>
      </div>
    );
};
