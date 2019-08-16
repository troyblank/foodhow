import React from 'react';
import Link from 'next/link';
import './recipeList.scss';

export default function RecipeList({ recipes }) {
    return (
      <>
        <header className={'recipe-list__header'}>
          <h1>Food How</h1>
          <p>Food How is a place on how to make food. You will find recipes on this site that are used to make foods that are probably pretty good to eat.</p>
        </header>
        <section className={'recipe-list__nodes'}>
          { recipes.map((r) => (
            <Link href={'/recipe/[recipe]'} as={`/recipe/${r.replace(/ /g, '_')}`} key={r}>
              <a>{r}</a>
            </Link>
          ))}
        </section>
      </>
    );
}
