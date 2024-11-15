import React, { useEffect, useState, type FunctionComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import dompurify from 'dompurify';
import classnames from 'classnames';
import { toggleIngredientOnList } from './actions';

export const extractLink = ( text: string ): { full: string, label: string, url: string } | null => {
    const regex = /^\[([\w\s\d&;]+)\]\(((?:\/)[\w\d./?=#]+)\)$/;
    const match = text.match(regex);

    if (match) {
        const [full, label, url] = match;

        return { full, label, url };
    }

    return null;
};

type IngredientProps = {
    fileName: string
    text: string,
}

export const Ingredient: FunctionComponent<IngredientProps> = ({
    fileName,
    text,
}) => {
    const dispatch = useDispatch();
    const shoppingListStore = useSelector(({ shoppingList }) => shoppingList );
    const { shoppingList = [] } = shoppingListStore;
    const [ isInList, setIsInList ] = useState(false);
    const link = extractLink(text);

    const getId = () => `${fileName}|${text}`;

    const onToggle = () => {
        const id = getId();
        const ingredient = { id, text };

        dispatch(toggleIngredientOnList(ingredient));
        setIsInList(!isInList);
    }

    useEffect(() => {
        const id = getId();

        setIsInList(Boolean(shoppingList.find((i) => id === i.id)));
    }, []);

    return (
        <li
            className={classnames('ingredient', {
            'ingredient--active': isInList,
            'ingredient--is-link': Boolean(link)
            })}
            data-testid={'ingredient'}
        >
            { !link &&
              <button
                dangerouslySetInnerHTML={{ __html: dompurify.sanitize(text) }}
                onClick={onToggle}
              />
            }
            { link &&
              <Link href={link.url}>
                {link.label}
              </Link>
            }
        </li>
    );
}
