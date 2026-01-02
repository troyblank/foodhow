import React, { useCallback, useState, ChangeEvent, type FunctionComponent } from 'react';
import Link from 'next/link';
import { getRecipes } from '../../data';
import { HeaderMessage } from '..';
import styles from './recipeList.module.css';

export const RecipeList: FunctionComponent = () => {
    const recipes = useCallback(() => getRecipes(), [])();
    const [filteredRecipes, setFilteredRecipes] = useState(recipes);

    const filterList = (value: string) => {
        const regex = new RegExp(value, 'i');

        setFilteredRecipes(recipes.filter((recipe) => Boolean(regex.test(recipe))));
    };

    const onSearch = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;

        filterList(value);
    };

    return (
      <div className={styles['recipe-list']}>
        <HeaderMessage
          headline={'Food How'}
          message={'Food How is a place on how to make food. You will find recipes on this site that are used to make foods that are probably pretty good to eat.'}
        />
        <section className={'recipe-list__search'}>
          <input
            autoComplete={'off'}
            type={'text'}
            name={'search'}
            placeholder={'Search'}
            onChange={onSearch}
          />
        </section>
        <section className={'recipe-list__nodes'}>
          { filteredRecipes.map((recipe) => (
            <Link href={'/recipe/[recipe]'} as={`/recipe/${recipe.replace(/ /g, '_')}`} key={recipe}>
              {recipe}
            </Link>
            ))}
        </section>
      </div>
    );
};
