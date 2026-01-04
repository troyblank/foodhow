import React, { Fragment, type FunctionComponent } from 'react';
import type { RecipeIngredient } from '../../types';
import { Ingredient } from '..';

type IngredientListProps = {
	title: string,
	ingredients: RecipeIngredient[],
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
					ingredientName={ingredient.text}
					ingredientType={ingredient.type}
					key={ingredient.text}
					recipeName={fileName}
				/>
			))}
		</ul>
	</Fragment>
);
