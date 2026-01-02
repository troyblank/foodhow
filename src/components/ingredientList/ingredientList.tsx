import React, { Fragment, type FunctionComponent } from 'react';
import { Ingredient } from '..';

type IngredientListProps = {
    title: string,
    ingredients: any,
    fileName: string
}

export const IngredientList: FunctionComponent<IngredientListProps> = ({
    fileName,
    ingredients,
    title
}) => (
  <Fragment>
    { title && <h3 className={'ingredient__title'}>{title}</h3> }
    <ul>
      { ingredients.map((ingredient) => (
        <Ingredient
          ingredientName={ingredient}
          key={ingredient}
          recipeName={fileName}
        />
      ))}
    </ul>
  </Fragment>
);
