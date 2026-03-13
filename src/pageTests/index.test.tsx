import { render } from '@testing-library/react'
import { type GetServerSidePropsContext } from 'next'
import React from 'react'

import { getServerSidePropsWithoutAuthRedirect } from '../utils'
import HomePage, { getServerSideProps } from '../pages/index'

jest.mock('../utils', () => ({
	...jest.requireActual('../utils'),
	getServerSidePropsWithoutAuthRedirect: jest.fn(),
}))

describe('Home page.', () => {
	it('Renders the page.', () => {
		const { container } = render(<HomePage />)

		expect(container).toBeInTheDocument()
	})

	it('Fetches server props and returns the user when no auth redirect is needed.', async () => {
		const serverSideContext: Partial<GetServerSidePropsContext> = {
			req: {} as any,
			res: {} as any,
			params: {},
			query: {},
		} as GetServerSidePropsContext

		jest.mocked(getServerSidePropsWithoutAuthRedirect).mockResolvedValue({
			props: { user: { name: 'Troy' } } as any,
		})

		const propsOrRedirect = await getServerSideProps(serverSideContext as GetServerSidePropsContext)

		expect(getServerSidePropsWithoutAuthRedirect).toHaveBeenCalledWith(serverSideContext)
		expect(propsOrRedirect).toEqual({
			props: { user: { name: 'Troy' } },
		})
	})

	it('Redirects to the shopping list on direct load when the last route was the shopping list.', async () => {
		const serverSideContext = {
			req: {
				headers: {
					cookie: 'foodhow_last_route=%2FshoppingList',
					referer: undefined,
				},
			},
			res: {} as any,
			params: {},
			query: {},
		} as GetServerSidePropsContext

		const propsOrRedirect = await getServerSideProps(serverSideContext)

		expect(getServerSidePropsWithoutAuthRedirect).not.toHaveBeenCalled()
		expect(propsOrRedirect).toEqual({
			redirect: { destination: '/shoppingList', permanent: false },
		})
	})
})
