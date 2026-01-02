import React from 'react';
import { render } from '@testing-library/react';
import { Guide } from './guide';

describe('Guide', () => {
    it('Should render.', () => {
        const { getByText, getAllByText } = render(<Guide />);

        expect(getByText('Meet your Meats')).toBeInTheDocument();
        expect(getAllByText('Meat')).toHaveLength(2);
        expect(getAllByText('Med-Rare')).toHaveLength(2);
        expect(getAllByText('Medium')).toHaveLength(2);
        expect(getAllByText('Done')).toHaveLength(2);
        expect(getByText('Beef')).toBeInTheDocument();
        expect(getByText('Lamb')).toBeInTheDocument();
        expect(getByText('Pork')).toBeInTheDocument();
        expect(getByText('Poultry')).toBeInTheDocument();
        expect(getByText('Really Rough Grill Time Guide')).toBeInTheDocument();
        expect(getByText('Hamburger')).toBeInTheDocument();
        expect(getByText('Chicken')).toBeInTheDocument();
    });
});
