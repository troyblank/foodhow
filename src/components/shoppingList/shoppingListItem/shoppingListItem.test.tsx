// UNDER REVIEW
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Chance from 'chance';
import React from 'react';
import { mockShoppingListItem } from '../../../testing/mocks/shoppingList';
import { ShoppingListItem } from './shoppingListItem';

describe('ShoppingListItem', () => {
    const chance = new Chance();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('Should render the item name.', () => {
        const itemName = chance.word();
        const item = mockShoppingListItem({ name: itemName });
        const { getByText } = render(<ShoppingListItem item={item} checked={false} onToggle={jest.fn()} />);

        expect(getByText(itemName)).toBeInTheDocument();
    });

    it('Should render checkbox as unchecked when checked prop is false.', () => {
        const item = mockShoppingListItem();
        const { getByRole } = render(<ShoppingListItem item={item} checked={false} onToggle={jest.fn()} />);

        const checkbox = getByRole('checkbox');
        expect(checkbox).not.toBeChecked();
    });

    it('Should render checkbox as checked when checked prop is true.', () => {
        const item = mockShoppingListItem();
        const { getByRole } = render(<ShoppingListItem item={item} checked={true} onToggle={jest.fn()} />);

        const checkbox = getByRole('checkbox');
        expect(checkbox).toBeChecked();
    });

    it('Should render list item with correct role.', () => {
        const item = mockShoppingListItem();
        const { container } = render(<ShoppingListItem item={item} checked={false} onToggle={jest.fn()} />);

        const listItem = container.querySelector('li[role="button"]');
        expect(listItem).toBeInTheDocument();
    });

    it('Should have only tab on list item for keyboard navigation.', () => {
        const item = mockShoppingListItem();
        const { container } = render(<ShoppingListItem item={item} checked={false} onToggle={jest.fn()} />);

        const listItem = container.querySelector('li[tabindex="0"]');
        expect(listItem).toBeInTheDocument();
    });

    it('Should not tab on checkbox when using keyboard navigation.', () => {
        const item = mockShoppingListItem();
        const { container } = render(<ShoppingListItem item={item} checked={false} onToggle={jest.fn()} />);

        const checkbox = container.querySelector('input[tabindex="-1"]');
        expect(checkbox).toBeInTheDocument();
    });

    it('Should have correct aria label for unchecked item.', () => {
        const itemName = chance.word();
        const item = mockShoppingListItem({ name: itemName });
        const { getByLabelText } = render(<ShoppingListItem item={item} checked={false} onToggle={jest.fn()} />);

        const listItem = getByLabelText(`${itemName} - unchecked`);
        expect(listItem).toBeInTheDocument();
    });

    it('Should have correct aria label for checked item.', () => {
        const itemName = chance.word();
        const item = mockShoppingListItem({ name: itemName });
        const { getByLabelText } = render(<ShoppingListItem item={item} checked={true} onToggle={jest.fn()} />);

        const listItem = getByLabelText(`${itemName} - checked`);
        expect(listItem).toBeInTheDocument();
    });

    it('Should have correct aria label for checkbox when unchecked.', () => {
        const itemName = chance.word();
        const item = mockShoppingListItem({ name: itemName });
        const { getByLabelText } = render(<ShoppingListItem item={item} checked={false} onToggle={jest.fn()} />);

        const checkbox = getByLabelText(`Mark ${itemName} as checked`);
        expect(checkbox).toBeInTheDocument();
    });

    it('Should have correct aria label for checkbox when checked.', () => {
        const itemName = chance.word();
        const item = mockShoppingListItem({ name: itemName });
        const { getByLabelText } = render(<ShoppingListItem item={item} checked={true} onToggle={jest.fn()} />);

        const checkbox = getByLabelText(`Mark ${itemName} as unchecked`);
        expect(checkbox).toBeInTheDocument();
    });

    it('Should call onToggle with item id when list item is clicked.', async () => {
        const user = userEvent.setup();
        const mockOnToggle = jest.fn();
        const itemId = chance.natural();
        const item = mockShoppingListItem({ id: itemId });
        const { getByLabelText } = render(<ShoppingListItem item={item} checked={false} onToggle={mockOnToggle} />);

        const listItem = getByLabelText(`${item.name} - unchecked`);
        await user.click(listItem);

        expect(mockOnToggle).toHaveBeenCalledTimes(1);
        expect(mockOnToggle).toHaveBeenCalledWith(itemId);
    });

    it('Should call onToggle with item id when checkbox is clicked.', async () => {
        const user = userEvent.setup();
        const mockOnToggle = jest.fn();
        const itemId = chance.natural();
        const item = mockShoppingListItem({ id: itemId });
        const { getByRole } = render(<ShoppingListItem item={item} checked={false} onToggle={mockOnToggle} />);

        const checkbox = getByRole('checkbox');
        await user.click(checkbox);

        expect(mockOnToggle).toHaveBeenCalledTimes(1);
        expect(mockOnToggle).toHaveBeenCalledWith(itemId);
    });

    it('Should stop event propagation when checkbox is clicked.', async () => {
        const user = userEvent.setup();
        const mockOnToggle = jest.fn();
        const item = mockShoppingListItem();
        const { getByRole } = render(<ShoppingListItem item={item} checked={false} onToggle={mockOnToggle} />);

        const checkbox = getByRole('checkbox');

        await user.click(checkbox);

        expect(mockOnToggle).toHaveBeenCalledTimes(1);

        mockOnToggle.mockClear();
        await user.click(checkbox);
        expect(mockOnToggle).toHaveBeenCalledTimes(1);
    });

    it('Should stop event propagation when checkbox onChange is triggered.', async () => {
        const user = userEvent.setup();
        const mockOnToggle = jest.fn();
        const item = mockShoppingListItem();
        const { getByRole } = render(<ShoppingListItem item={item} checked={false} onToggle={mockOnToggle} />);

        const checkbox = getByRole('checkbox');

        await user.click(checkbox);

        expect(mockOnToggle).toHaveBeenCalledTimes(1);
        expect(mockOnToggle).toHaveBeenCalledWith(item.id);
    });

    it('Should call onToggle when Enter key is pressed on list item.', async () => {
        const user = userEvent.setup();
        const mockOnToggle = jest.fn();
        const itemId = chance.natural();
        const item = mockShoppingListItem({ id: itemId });
        const { getByLabelText } = render(<ShoppingListItem item={item} checked={false} onToggle={mockOnToggle} />);

        const listItem = getByLabelText(`${item.name} - unchecked`);
        listItem.focus();
        await user.keyboard('{Enter}');

        expect(mockOnToggle).toHaveBeenCalledTimes(1);
        expect(mockOnToggle).toHaveBeenCalledWith(itemId);
    });

    it('Should call onToggle when Space key is pressed on list item.', async () => {
        const user = userEvent.setup();
        const mockOnToggle = jest.fn();
        const itemId = chance.natural();
        const item = mockShoppingListItem({ id: itemId });
        const { getByLabelText } = render(<ShoppingListItem item={item} checked={false} onToggle={mockOnToggle} />);

        const listItem = getByLabelText(`${item.name} - unchecked`);
        listItem.focus();
        await user.keyboard(' ');

        expect(mockOnToggle).toHaveBeenCalledTimes(1);
        expect(mockOnToggle).toHaveBeenCalledWith(itemId);
    });

    it('Should prevent default behavior when Enter key is pressed.', async () => {
        const user = userEvent.setup();
        const mockOnToggle = jest.fn();
        const item = mockShoppingListItem();
        const { getByLabelText } = render(<ShoppingListItem item={item} checked={false} onToggle={mockOnToggle} />);

        const listItem = getByLabelText(`${item.name} - unchecked`);
        const preventDefaultSpy = jest.spyOn(KeyboardEvent.prototype, 'preventDefault');

        listItem.focus();
        await user.keyboard('{Enter}');

        expect(preventDefaultSpy).toHaveBeenCalled();
        preventDefaultSpy.mockRestore();
    });

    it('Should prevent default behavior when Space key is pressed.', async () => {
        const user = userEvent.setup();
        const mockOnToggle = jest.fn();
        const item = mockShoppingListItem();
        const { getByLabelText } = render(<ShoppingListItem item={item} checked={false} onToggle={mockOnToggle} />);

        const listItem = getByLabelText(`${item.name} - unchecked`);
        const preventDefaultSpy = jest.spyOn(KeyboardEvent.prototype, 'preventDefault');

        listItem.focus();
        await user.keyboard(' ');

        expect(preventDefaultSpy).toHaveBeenCalled();
        preventDefaultSpy.mockRestore();
    });

    it('Should not call onToggle when other keys are pressed.', async () => {
        const user = userEvent.setup();
        const mockOnToggle = jest.fn();
        const item = mockShoppingListItem();
        const { getByLabelText } = render(<ShoppingListItem item={item} checked={false} onToggle={mockOnToggle} />);

        const listItem = getByLabelText(`${item.name} - unchecked`);
        listItem.focus();
        await user.keyboard('{Tab}');
        await user.keyboard('{Escape}');
        await user.keyboard('a');

        expect(mockOnToggle).not.toHaveBeenCalled();
    });

    it('Should handle multiple clicks correctly.', async () => {
        const user = userEvent.setup();
        const mockOnToggle = jest.fn();
        const itemId = chance.natural();
        const item = mockShoppingListItem({ id: itemId });
        const { getByLabelText } = render(<ShoppingListItem item={item} checked={false} onToggle={mockOnToggle} />);

        const listItem = getByLabelText(`${item.name} - unchecked`);

        await user.click(listItem);
        await user.click(listItem);
        await user.click(listItem);

        expect(mockOnToggle).toHaveBeenCalledTimes(3);
        expect(mockOnToggle).toHaveBeenCalledWith(itemId);
    });

    it('Should work correctly when toggling between checked and unchecked states.', () => {
        const mockOnToggle = jest.fn();
        const item = mockShoppingListItem();
        const { rerender, getByLabelText, getByRole } = render(<ShoppingListItem item={item} checked={false} onToggle={mockOnToggle} />);

        expect(getByLabelText(`${item.name} - unchecked`)).toBeInTheDocument();
        expect(getByRole('checkbox')).not.toBeChecked();

        rerender(<ShoppingListItem item={item} checked={true} onToggle={mockOnToggle} />);

        expect(getByLabelText(`${item.name} - checked`)).toBeInTheDocument();
        expect(getByRole('checkbox')).toBeChecked();
    });
});
