import React, { type FunctionComponent } from 'react';
import { Head, Navigation, Guide } from '../components';

export const GuidePage: FunctionComponent = () => {
    return (
      <>
        <Head />
        <Navigation />
        <Guide />
      </>
    );
}

export default GuidePage
