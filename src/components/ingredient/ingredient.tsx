import React, { type FunctionComponent } from 'react';
import Link from 'next/link';
import dompurify from 'dompurify';
import { useAuth } from '../../contexts';
import { useCreateShoppingListItem, useShoppingList } from '../../data';
import { Spinner } from '..';
import styles from './ingredient.module.css';

export const extractLink = (text: string): { full: string, label: string, url: string } | null => {
    const regex = /^\[([\w\s\d&;]+)\]\(((?:\/)[\w\d./?=#]+)\)$/;
    const match = text.match(regex);

    if (match) {
        const [full, label, url] = match;

        return { full, label, url };
    }

    return null;
};

type IngredientProps = {
    recipeName: string
    ingredientName: string,
}

export const Ingredient: FunctionComponent<IngredientProps> = ({
    recipeName,
    ingredientName
}) => {
    const { user } = useAuth();
    const { data: shoppingList = [], isLoading } = useShoppingList(user);
    const { mutateAsync: createShoppingListItem, isPending: isSaving } = useCreateShoppingListItem(user);
    const isPending = isLoading || isSaving;
    const link = extractLink(ingredientName); // A link looks like [1 link to another recipe](/some/link)
    const canAddToList = !link && user;

    const isInList = shoppingList.some(
        (item) => item.name === ingredientName && item.recipe === recipeName
    );

    const onToggle = () => {
        createShoppingListItem({
            amount: 1,
            name: ingredientName,
            recipe: recipeName,
            type: 'frozen', // hard code for now
            store: 'Unspecified' // hard code for now
        });
    };

    const className = [
        styles.ingredient,
        isInList ? styles['ingredient--active'] : '',
        link ? styles['ingredient--is-link'] : '',
        isPending ? styles['ingredient--pending'] : ''
    ].filter(Boolean).join(' ');

    return (
      <li
        className={className}
        data-testid={'ingredient'}
      >
        {isPending && <span className={styles.spinner}><Spinner size={'small'} color={'brown'} /></span>}
        { canAddToList && !link &&
          <button
            dangerouslySetInnerHTML={{ __html: dompurify.sanitize(ingredientName) }}
            onClick={onToggle}
            disabled={isInList || isPending}
          />}
        { !canAddToList && !link &&
          <span dangerouslySetInnerHTML={{ __html: dompurify.sanitize(ingredientName) }} />}
        { link &&
          <Link href={link.url}>
            {link.label}
          </Link>}
      </li>
    );
};
