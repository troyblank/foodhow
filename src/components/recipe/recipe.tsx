import React, { useEffect, useState, type FunctionComponent } from 'react';
import dompurify from 'dompurify';
import { isArray } from 'lodash';
import { Directions, IngredientList } from '..';

export function objectifyIngredients(polymorphicIngredients) {
    // ingredients can be an array or object:
    // this converts all to an object for easy parsing.
    let ingredients = polymorphicIngredients;

    if (isArray(ingredients)) {
        ingredients = { '': [...ingredients] };
    }

    return ingredients;
}

type RecipeProps = {
    fileName: string
}

export const Recipe: FunctionComponent<RecipeProps> = ({ fileName }) => {
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        fetch(`/recipes/${fileName.toLowerCase()}.json`)
            .then((response) => response.json())
            .then((recipe) => {
                setRecipe(recipe);
            });
    }, []);

    if (!recipe) return null;

    const { title, meta, ingredients: polymorphicIngredients, directions } = recipe;
    const ingredients = objectifyIngredients(polymorphicIngredients);
    const ingredientTitles = Object.keys(ingredients);

    return (
      <section className={'recipe'}>
        <header>
          <h1>{ title }</h1>
          { meta && <h3 dangerouslySetInnerHTML={{ __html: dompurify.sanitize(meta) }} /> }
        </header>
        <section>
          <h2>Ingredients</h2>
          { ingredientTitles.map((title) => (
            <IngredientList
              title={title}
              ingredients={ingredients[title]}
              fileName={fileName}
              key={title}
            />
               ))}
        </section>
        <section>
          <h2>Directions</h2>
          <Directions steps={directions} />
        </section>
      </section>
    );
};
