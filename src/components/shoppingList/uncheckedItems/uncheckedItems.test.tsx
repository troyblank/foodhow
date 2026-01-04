import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UncheckedItems } from './uncheckedItems';
import { mockShoppingListItem } from '../../../testing/mocks/shoppingList';
import { SHOPPING_ITEM_TYPE } from '../../../types';

describe('UncheckedItems', () => {
	it('should render items grouped by type with category headings', () => {
		const produceItem = mockShoppingListItem({ type: SHOPPING_ITEM_TYPE.produce });
		const meatItem = mockShoppingListItem({ type: SHOPPING_ITEM_TYPE.meat });

		const { getByText } = render(
			<UncheckedItems items={[produceItem, meatItem]} onToggle={jest.fn()} />
		);

		expect(getByText('Produce')).toBeInTheDocument();
		expect(getByText('Meat')).toBeInTheDocument();
		expect(getByText(produceItem.name)).toBeInTheDocument();
		expect(getByText(meatItem.name)).toBeInTheDocument();
	});

	it('should not render empty categories', () => {
		const produceItem = mockShoppingListItem({ type: SHOPPING_ITEM_TYPE.produce });

		const { queryByText } = render(
			<UncheckedItems items={[produceItem]} onToggle={jest.fn()} />
		);

		expect(queryByText('Produce')).toBeInTheDocument();
		expect(queryByText('Meat')).not.toBeInTheDocument();
		expect(queryByText('Frozen')).not.toBeInTheDocument();
	});

	it('should render categories in the correct order', () => {
		const frozenItem = mockShoppingListItem({ type: SHOPPING_ITEM_TYPE.frozen });
		const uncommonItem = mockShoppingListItem({ type: SHOPPING_ITEM_TYPE.uncommon });
		const produceItem = mockShoppingListItem({ type: SHOPPING_ITEM_TYPE.produce });

		const { container } = render(
			<UncheckedItems items={[frozenItem, uncommonItem, produceItem]} onToggle={jest.fn()} />
		);

		const headings = container.querySelectorAll('h2');
		const headingTexts = Array.from(headings).map((h) => h.textContent);

		expect(headingTexts).toEqual(['Uncommon', 'Produce', 'Frozen']);
	});

	it('should render multiple items within the same category', () => {
		const produceItem1 = mockShoppingListItem({ type: SHOPPING_ITEM_TYPE.produce });
		const produceItem2 = mockShoppingListItem({ type: SHOPPING_ITEM_TYPE.produce });

		const { getByText, getAllByRole } = render(
			<UncheckedItems items={[produceItem1, produceItem2]} onToggle={jest.fn()} />
		);

		expect(getByText(produceItem1.name)).toBeInTheDocument();
		expect(getByText(produceItem2.name)).toBeInTheDocument();

		const lists = getAllByRole('list');
		expect(lists).toHaveLength(1);
	});

	it('should let the parent handle the toggle of each clicked shopping list item', async () => {
		const user = userEvent.setup();
		const onToggle = jest.fn();
		const item = mockShoppingListItem({ type: SHOPPING_ITEM_TYPE.produce });

		const { getByLabelText } = render(
			<UncheckedItems items={[item]} onToggle={onToggle} />
		);

		await user.click(getByLabelText(`${item.name} - unchecked`));

		expect(onToggle).toHaveBeenCalledWith(item.id);
	});

	it('should render nothing when items array is empty', () => {
		const { container } = render(
			<UncheckedItems items={[]} onToggle={jest.fn()} />
		);

		expect(container.querySelectorAll('section')).toHaveLength(0);
	});

	it('should render all items as unchecked', () => {
		const item = mockShoppingListItem({ type: SHOPPING_ITEM_TYPE.produce });

		const { getByRole } = render(
			<UncheckedItems items={[item]} onToggle={jest.fn()} />
		);

		expect(getByRole('checkbox')).not.toBeChecked();
	});
});
