export const SHOPPING_ITEM_TYPE = [
    'meat',
    'perishable',
    'produce',
    'frozen',
    'imperishable',
    'spice',
    'uncommon'
] as const;

export const SHOPPING_ITEM_STORE = [
    'Jewel-Osco',
    'Pete\'s',
    'Wild Fork',
    'Unspecified'
] as const;


export type ShoppingItemType = typeof SHOPPING_ITEM_TYPE[number];
export type ShoppingItemStore = typeof SHOPPING_ITEM_STORE[number];

export type NewShoppingListItem = {
    amount: number,
    name: string,
    recipe?: string,
    store: ShoppingItemStore,
    type: ShoppingItemType,
}

export type ShoppingListItem = NewShoppingListItem & {
    id: number,
}

export type ShoppingList = ShoppingListItem[]
