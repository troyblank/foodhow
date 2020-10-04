import React, { PureComponent } from 'react';
import dompurify from 'dompurify';
import { isArray } from 'lodash';
import IngredientList from '../ingredientList/ingredientList';
import Directions from '../directions';

export function objectifyIngredients(polymorphicIngredients) {
    // ingredients can be an array or object:
    // this converts all to an object for easy parsing.
    let ingredients = polymorphicIngredients;

    if (isArray(ingredients)) {
        ingredients = { '': [...ingredients] };
    }

    return ingredients;
}

export default class Recipe extends PureComponent {
    constructor(props) {
        super(props);

        this.state = { recipe: null };
    }

    componentDidMount() {
        this.getRecipe();
    }

    getRecipe() {
        const { fileName } = this.props;

        fetch(`/static/recipes/${fileName}.json`)
            .then((response) => response.json())
            .then((recipe) => {
                this.setState({ recipe });
            });
    }

    render() {
        const { fileName } = this.props;
        const { recipe } = this.state;

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
              { ingredientTitles.map((ingredientTitle) => (
                <IngredientList
                  title={ingredientTitle}
                  ingredients={ingredients[ingredientTitle]}
                  fileName={fileName}
                  key={ingredientTitle}
                />
              ))}
            </section>
            <section>
              <h2>Directions</h2>
              <Directions steps={directions} />
            </section>
          </section>
        );
    }
}
