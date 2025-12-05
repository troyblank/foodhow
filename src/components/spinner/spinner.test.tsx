import React from 'react';
import { render } from '@testing-library/react';
import { Spinner } from './spinner';

describe('Spinner', () => {
    it('should render with default props', () => {
        const { getByLabelText } = render(<Spinner />);

        expect(getByLabelText('Loading')).toBeInTheDocument();
    });

    it('should render with small size', () => {
        const { getByLabelText } = render(<Spinner size={'small'} />);

        expect(getByLabelText('Loading')).toBeInTheDocument();
    });

    it('should render with brown color', () => {
        const { getByLabelText } = render(<Spinner color={'brown'} />);

        expect(getByLabelText('Loading')).toBeInTheDocument();
    });
});
