import { render } from '@testing-library/react'
import React from 'react';

import GuidePage from './guide';

describe('Page - Guide', () => {
    it('should render', () => {
        const { container } = render(<GuidePage />);

        expect(container).toBeInTheDocument();
    });
});
