import React from 'react';
import { useRouter } from 'next/router';
import { Head, Navigation, Recipe } from '../../components';

export default function RecipePage() {
    const router = useRouter();
    const { recipe } = router.query

    if (!recipe) return null;

    return (
      <>
        <Head />
        <Navigation />
        <Recipe fileName={recipe as string} />
      </>
    );
}
