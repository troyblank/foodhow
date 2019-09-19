import React from 'react';
import { get } from 'lodash';
import { useRouter } from 'next/router';
import { Head, Navigation, Recipe } from '../../src/components';

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
