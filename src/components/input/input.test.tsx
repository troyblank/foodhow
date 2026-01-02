import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Chance from 'chance';
import { Input } from './input';

describe('Input', () => {
    const chance = new Chance();

    it('should render with the given value', () => {
        const value = chance.word();

        const { getByRole } = render(<Input value={value} onChange={jest.fn()} />);

        expect(getByRole('textbox')).toHaveValue(value);
    });

    it('should call on change handler with the new value when typing', async () => {
        const onChange = jest.fn();

        const { getByRole } = render(<Input value={''} onChange={onChange} />);

        await userEvent.type(getByRole('textbox'), 'a');

        expect(onChange).toHaveBeenCalledWith('a');
    });

    it('should render with the given id', () => {
        const id = chance.word();

        const { getByRole } = render(<Input value={''} onChange={jest.fn()} id={id} />);

        expect(getByRole('textbox')).toHaveAttribute('id', id);
    });

    it('should render with the given name', () => {
        const name = chance.word();

        const { getByRole } = render(<Input value={''} onChange={jest.fn()} name={name} />);

        expect(getByRole('textbox')).toHaveAttribute('name', name);
    });

    it('should render with type text by default', () => {
        const { getByRole } = render(<Input value={''} onChange={jest.fn()} />);

        expect(getByRole('textbox')).toHaveAttribute('type', 'text');
    });

    it('should render with the given type', () => {
        const { container } = render(<Input value={''} onChange={jest.fn()} type={'email'} />);

        expect(container.querySelector('input')).toHaveAttribute('type', 'email');
    });
});
