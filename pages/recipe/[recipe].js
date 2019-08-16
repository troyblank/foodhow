import React from 'react';
import { get } from 'lodash';
import { useRouter } from 'next/router';
import { Head, Navigation } from '../../src/components';

export default function Recipe() {
    const router = useRouter();
    const { recipe } = get(router, 'query', {});

    return (
      <>
        <Head />
        <Navigation />
        <div>hi i am a recipe: { recipe }</div>
      </>
    );
}
