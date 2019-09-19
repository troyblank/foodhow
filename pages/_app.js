import React from 'react';
import App from 'next/app';
import { Provider } from 'react-redux';
import Store from '../src/store';

export default class FoodHow extends App {
    render() {
        const { Component, pageProps } = this.props;

        return (
          <Provider store={Store}>
            <Component {...pageProps} />
          </Provider>
        );
    }
}
