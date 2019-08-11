import React from 'react';
import Head from 'next/head'
import './head.scss';

export default function HeadComponent() {
    return (
        <Head>
            <meta httpEquiv={'Content-Type'} content={'text/html; charset=utf-8'} />
            <meta name={'viewport'} content={'width=device-width, initial-scale=1'} />
            <title>Food How</title>
        </Head>
    );
}
