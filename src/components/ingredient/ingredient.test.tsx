import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import Chance from 'chance';
import { extractLink, Ingredient } from './ingredient';

jest.mock('react-redux', () => ({
    useDispatch: jest.fn(),
    useSelector: jest.fn().mockImplementation(() => ({
        shoppingList: []
    }))
}));

describe('Ingredient', () => {
    const chance = new Chance();
    const text = chance.word();
    const url = `/${chance.word()}/${chance.word()}`;
    const link = `[${text}](${url})`;
    const fileName = chance.word();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('Should render.', () => {
        const { getByText } = render(<Ingredient text={text} fileName={''} />);

        expect( getByText( text ) ).toBeInTheDocument();
    });

    it('Should render a link.', () => {
        const { getByText } = render(<Ingredient text={link} fileName={''} />);
        const linkInDom = getByText( text );

        expect(linkInDom).toHaveAttribute('href',url);
    });

    it('Should be able to determine if an ingredient is in the shopping list.', async() => {
        jest.mocked( useSelector ).mockImplementation((selector) => selector({
            shoppingList: {
                shoppingList: [{ id: `${fileName}|${text}` }]
            }
        }));

        const { getByTestId } = render(<Ingredient text={text} fileName={fileName} />);

        await waitFor(() =>  expect(getByTestId('ingredient')).toHaveAttribute('class', 'ingredient ingredient--active') )
    });

    it('Should be able to toggle and ingredient.', async() => {
        const dispatch = jest.fn();

        jest.mocked( useDispatch ).mockReturnValue(dispatch);
        jest.mocked( useSelector ).mockImplementation((selector) => selector({
            shoppingList: {}
        }));

        const { getByTestId, getByText } = render(<Ingredient text={text} fileName={fileName} />);

        await userEvent.click(getByText(text));

        expect(dispatch).toHaveBeenCalled();

        await waitFor(() => expect(getByTestId('ingredient')).toHaveAttribute('class', 'ingredient ingredient--active') )
    });

    it('Should be able to extract a link from raw text that is in the proper format.', () => {
        const { full, label, url: extractedURL } = extractLink(link);

        expect(full).toBe(link);
        expect(label).toBe(text);
        expect(extractedURL).toBe(url);
    });

    it('Should not be able to extract a link from raw text that is not in the proper format.', () => {
        const badLink = extractLink(text);

        expect(badLink).toBeNull();
    });
});
