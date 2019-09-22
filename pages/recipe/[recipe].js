import React from 'react';
import { get } from 'lodash';
import { useRouter } from 'next/router';
import { Recipe } from '../../src/components/connections';
import { Head, Navigation } from '../../src/components';

export default function RecipePage() {
    const router = useRouter();
    const { recipe } = get(router, 'query', {});

    return (
      <x>
        <Head />
        <Navigation />
        { recipe && <Recipe fileName={recipe} /> }
      </x>
    );
}
