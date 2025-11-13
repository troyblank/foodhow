import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Button, NoResultMessage } from '@troyblank/food-how-components';
import { useAuth } from '../../contexts';
import { useShoppingList } from '../../data';
import { ShoppingListItem } from './shoppingListItem';
import styles from './shoppingList.module.css';

const STORAGE_KEY = 'shoppingListCheckedShoppingListItems';

/* istanbul ignore next */
export const throwLocalStorageError = (): never => {
    throw new Error('Error saving checked items to localStorage');
};

export const ShoppingList = () => {
    const { user } = useAuth();
    const { isLoading, data: shoppingList } = useShoppingList(user);
    const [checkedItemIds, setCheckedItemIds] = useState<Set<number>>(new Set());
    const isInitialized = useRef(false);

    // Loads checked items from localStorage once shopping list data is available
    useEffect(() => {
        if (isLoading || !shoppingList) {
            return;
        }

        try {
            const stored = localStorage.getItem(STORAGE_KEY);

            if (stored) {
                const parsedIds = JSON.parse(stored) as number[];
                const validItemIds = new Set(shoppingList.map((item) => item.id));
                const validCheckedIds = parsedIds.filter((id: number) => validItemIds.has(id));

                setCheckedItemIds(new Set(validCheckedIds));
            }
        } catch {
            // Use default of no checked items
        }

        isInitialized.current = true;
    }, [shoppingList, isLoading]);

    // Save checked items to localStorage whenever they change
    useEffect(() => {
        if (!isInitialized.current) {
            // Local store is not initialized yet.
            return;
        }

        try {
            const itemIds = Array.from(checkedItemIds);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(itemIds));
        } catch {
            throwLocalStorageError();
        }
    }, [checkedItemIds]);

    const toggleItemChecked = (id: number) => {
        setCheckedItemIds((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id);
            } else {
                newSet.add(id);
            }
            return newSet;
        });
    };

    const onClear = () => {
        // eslint-disable-next-line no-console
        console.log('Clear items not implemented yet!');
    };

    const { uncheckedItems, checkedItems } = useMemo(() => {
        if (!shoppingList) {
            return { uncheckedItems: [], checkedItems: [] };
        }
        const unchecked: typeof shoppingList = [];
        const checked: typeof shoppingList = [];

        shoppingList.forEach((item) => {
            if (checkedItemIds.has(item.id)) {
                checked.push(item);
            } else {
                unchecked.push(item);
            }
        });

        return { uncheckedItems: unchecked, checkedItems: checked };
    }, [shoppingList, checkedItemIds]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const isEmpty = 0 === shoppingList.length;
    const isAnyItemsChecked = checkedItemIds.size > 0;

    return (
      <section className={styles['shopping-list']}>
        {isEmpty && (
          <div className={styles['shopping-list__no-result-message']}>
            <NoResultMessage headline={'figure out title'} message={'no things or oh so proud'} />
          </div>
        )}
        <ul className={styles['shopping-list__items']}>
          {uncheckedItems.map((item) => (
            <ShoppingListItem
              key={item.id}
              item={item}
              checked={checkedItemIds.has(item.id)}
              onToggle={toggleItemChecked}
            />
            ))}
        </ul>
        { isAnyItemsChecked && (
        <Button
          className={styles['shopping-list__clear-button']}
          text={'Delete Checked'}
          buttonClickHand={onClear}
        />
        )}
        {checkedItems.length > 0 && (
          <ul className={styles['shopping-list']}>
            {checkedItems.map((item) => (
              <ShoppingListItem
                key={item.id}
                item={item}
                checked={checkedItemIds.has(item.id)}
                onToggle={toggleItemChecked}
              />
            ))}
          </ul>
        )}
      </section>
    );
};
