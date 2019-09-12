import React from 'react';
import list from '../static/recipes.json';
import { Head, Navigation, RecipeList } from '../src/components';

export default function IndexPage() {
    const { recipes } = list;

    return (
      <x>
        <Head />
        <Navigation />
        <RecipeList recipes={recipes} />
      </x>
    );
}
