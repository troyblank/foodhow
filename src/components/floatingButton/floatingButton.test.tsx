import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Chance from 'chance';
import { FloatingButton } from './floatingButton';

describe('FloatingButton', () => {
    const chance = new Chance();

    it('should render', () => {
        const ariaLabel = chance.word();

        const { getByRole } = render(<FloatingButton ariaLabel={ariaLabel} />);

        expect(getByRole('button', { name: ariaLabel })).toBeInTheDocument();
    });

    it('should render with a plus sign text', () => {
        const ariaLabel = chance.word();

        const { getByText } = render(<FloatingButton ariaLabel={ariaLabel} />);

        expect(getByText('+')).toBeInTheDocument();
    });

    it('should call the click handler when clicked', async () => {
        const ariaLabel = chance.word();
        const onClick = jest.fn();

        const { getByRole } = render(<FloatingButton ariaLabel={ariaLabel} onClick={onClick} />);

        await userEvent.click(getByRole('button'));

        expect(onClick).toHaveBeenCalled();
    });
});
