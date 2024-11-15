import { render } from '@testing-library/react'
import React from 'react';

import HomePage from './index';

describe('Page - Index', () => {
    it('should render', () => {
        const { container } = render(<HomePage />);

        expect(container).toBeInTheDocument();
    });
});
