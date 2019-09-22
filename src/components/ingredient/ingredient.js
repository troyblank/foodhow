import React, { PureComponent } from 'react';
import dompurify from 'dompurify';
import classnames from 'classnames';
import { toggleIngredientOnList } from './actions';
import './ingredient.scss';

export default class Ingredient extends PureComponent {
    getID() {
        const { fileName, text } = this.props;

        return `${fileName}|${text}`;
    }

    isInShoppingList() {
        const { shoppingList } = this.props;
        const id = this.getID();

        return Boolean(shoppingList.find((i) => id === i.id));
    }

    onToggle = () => {
        const { text, dispatch } = this.props;
        const id = this.getID();
        const ingredient = { id, text };

        dispatch(toggleIngredientOnList(ingredient));
    }

    render() {
        const { text } = this.props;

        return (
          <li
            className={classnames('ingredient', {
              'ingredient--active': this.isInShoppingList()
            })}
          >
            <button
              dangerouslySetInnerHTML={{ __html: dompurify.sanitize(text) }}
              onClick={this.onToggle}
            />
          </li>
        );
    }
}
