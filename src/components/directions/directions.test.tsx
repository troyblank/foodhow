import React from 'react';
import { render } from '@testing-library/react';
import Chance from 'chance';
import { Directions } from './directions';

describe('Directions', () => {
    const chance = new Chance();
    const directions = [
        { text: chance.word() },
        { text: chance.word(), type: 'optional' },
        [
            { text: chance.word() },
            { text: chance.word() }
        ]
    ];

    it('Should render.', () => {
        const { getByText } = render(<Directions steps={directions} />);

        directions.forEach((direction) => {
            if (Array.isArray(direction)) {
                direction.forEach((subDirection) => {
                    expect(getByText(subDirection.text)).toBeInTheDocument();
                });
            } else {
                expect(getByText(direction.text)).toBeInTheDocument();
            }
        });
    });
});
