import React from 'react';
import { render } from '@testing-library/react'
import Chance from 'chance';
import { Navigation } from './';

describe('Navigation', () => {
    const chance = new Chance();

    it('should render', () => {
        const { getByText } = render(<Navigation />);

        expect(getByText('home')).toBeInTheDocument();
        expect(getByText('guide')).toBeInTheDocument();
        expect(getByText('list')).toBeInTheDocument();
    })
});
