export const SHOPPING_ITEM_TYPE = {
	meat: 'meat',
	perishable: 'perishable',
	produce: 'produce',
	frozen: 'frozen',
	imperishable: 'imperishable',
	spice: 'spice',
	uncommon: 'uncommon'
} as const;

export const SHOPPING_ITEM_STORE = {
	jewelOsco: 'Jewel-Osco',
	petes: 'Pete\'s',
	wildFork: 'Wild Fork',
	unspecified: 'Unspecified'
} as const;

export type ShoppingItemType = typeof SHOPPING_ITEM_TYPE[keyof typeof SHOPPING_ITEM_TYPE];
export type ShoppingItemStore = typeof SHOPPING_ITEM_STORE[keyof typeof SHOPPING_ITEM_STORE];

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
