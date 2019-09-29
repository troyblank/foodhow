import React, { PureComponent } from 'react';
import dompurify from 'dompurify';
import { Ingredient } from '..';

export default class Recipe extends PureComponent {
    state = {
        recipe: null
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
        const { fileName, shoppingListStore, dispatch } = this.props;
        const { shoppingList } = shoppingListStore;
        const { recipe } = this.state;

        if (!recipe) return null;

        const { title, meta, ingredients, directions } = recipe;

        return (
          <section className={'recipe'}>
            <header>
              <h1>{ title }</h1>
              { true && <h3>{meta}</h3> }
            </header>
            <section>
              <h2>Ingredients</h2>
              <ul>
                { ingredients.map((i) => (
                  <Ingredient
                    fileName={fileName}
                    text={i}
                    shoppingList={shoppingList}
                    dispatch={dispatch}
                    key={i}
                  />
                ))}
              </ul>
            </section>
            <section>
              <h2>Directions</h2>
              <ol>
                { directions.map((d) => (
                  <li
                    key={d}
                    dangerouslySetInnerHTML={{ __html: dompurify.sanitize(d) }}
                  />
                ))}
              </ol>
            </section>
          </section>
        );
    }
}
