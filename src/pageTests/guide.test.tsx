import { render } from '@testing-library/react';
import { type GetServerSidePropsContext } from 'next';
import React from 'react';

import { getServerSidePropsWithoutAuthRedirect } from '../utils';
import GuidePage, { getServerSideProps } from '../pages/guide';

jest.mock('../utils', () => ({
	getServerSidePropsWithoutAuthRedirect: jest.fn()
}));

describe('Page - Guide', () => {
	it('should render', () => {
		const { container } = render(<GuidePage />);

		expect(container).toBeInTheDocument();
	});

	it('should call getServerSidePropsWithoutAuthRedirect with context', async () => {
		const context: Partial<GetServerSidePropsContext> = {
			req: {} as any,
			res: {} as any,
			params: {},
			query: {}
		} as GetServerSidePropsContext;

		jest.mocked(getServerSidePropsWithoutAuthRedirect).mockResolvedValue({
			props: { user: { name: 'Troy' } } as any
		});

		const result = await getServerSideProps(context as GetServerSidePropsContext);

		expect(getServerSidePropsWithoutAuthRedirect).toHaveBeenCalledWith(context);
		expect(result).toEqual({
			props: { user: { name: 'Troy' } }
		});
	});
});
