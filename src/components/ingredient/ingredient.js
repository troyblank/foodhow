import React, { PureComponent } from 'react';
import Link from 'next/link';
import dompurify from 'dompurify';
import classnames from 'classnames';
import { toggleIngredientOnList } from './actions';
import './ingredient.scss';

export const extractLink = (text) => {
    const regex = /^\[([\w\s\d]+)\]\(((?:\/|https?:\/\/)[\w\d./?=#]+)\)$/;
    const match = text.match(regex);

    if (match) {
        const [full, label, url] = match;

        return { full, label, url };
    }

    return null;
};

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
        const link = extractLink(text);

        return (
          <li
            className={classnames('ingredient', {
              'ingredient--active': this.isInShoppingList(),
              'ingredient--is-link': Boolean(link)
            })}
          >
            { !link &&
              <button
                dangerouslySetInnerHTML={{ __html: dompurify.sanitize(text) }}
                onClick={this.onToggle}
              />}
            { link &&
              <Link href={link.url}>
                <a>{link.label}</a>
              </Link>}
          </li>
        );
    }
}
