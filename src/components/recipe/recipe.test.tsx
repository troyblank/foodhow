import React from 'react'
import { render, waitFor } from '@testing-library/react'
import Chance from 'chance'
import { Recipe } from '.'

jest.mock('../../contexts', () => ({
	useAuth: jest.fn().mockImplementation(() => ({
		user: null,
	})),
}))

jest.mock('../../data', () => ({
	useShoppingList: jest.fn().mockImplementation(() => ({
		data: [],
		isLoading: false,
	})),
	useCreateShoppingListItem: jest.fn().mockImplementation(() => ({
		mutateAsync: jest.fn(),
		isPending: false,
	})),
}))

describe('Recipe', () => {
	const chance = new Chance()
	const title = chance.word({ syllables: 4 })
	const meta = chance.word({ syllables: 3 })
	const ingredients = [chance.word(), chance.word(), chance.word()]
	const directions = [
		{ text: chance.word({ syllable: 3 }) },
		{ text: chance.word({ syllable: 4 }) },
		{ text: chance.word({ syllable: 5 }) },
	]
	const recipe = {
		title,
		meta,
		ingredients,
		directions,
	}

	beforeEach(() => {
		const headers = new Headers()
		headers.set('content-type', 'application/json')
		global.fetch = jest.fn(() => Promise.resolve({
			json: () => Promise.resolve(recipe),
			ok: true,
			status: 200,
			headers,
		} as Response))
	})

	it('Should render.', async () => {
		const { getByText } = render(<Recipe fileName={chance.word()} />)

		await waitFor(() => {
			expect(getByText(title)).toBeInTheDocument()
		})
	})

	it('Shows error when recipe fails to load.', async () => {
		global.fetch = jest.fn(() => Promise.resolve({
			ok: false,
			status: 404,
			headers: new Headers(),
		} as Response))

		const { getByText } = render(<Recipe fileName={chance.word()} />)

		await waitFor(() => {
			expect(getByText('Recipe not found.')).toBeInTheDocument()
		})
	})

	it('Shows error when response is not JSON.', async () => {
		const headers = new Headers()
		headers.set('content-type', 'text/html')
		global.fetch = jest.fn(() => Promise.resolve({
			ok: true,
			status: 200,
			headers,
		} as Response))

		const { getByText } = render(<Recipe fileName={chance.word()} />)

		await waitFor(() => {
			expect(getByText('Recipe not found.')).toBeInTheDocument()
		})
	})

	it('Should render all ingredients and directions.', async () => {
		const { getByText } = render(<Recipe fileName={chance.word()} />)

		await waitFor(() => {
			expect(getByText(ingredients[0])).toBeInTheDocument()
			expect(getByText(ingredients[1])).toBeInTheDocument()
			expect(getByText(ingredients[2])).toBeInTheDocument()
			expect(getByText(directions[0].text)).toBeInTheDocument()
			expect(getByText(directions[1].text)).toBeInTheDocument()
			expect(getByText(directions[2].text)).toBeInTheDocument()
		})
	})

	it('Should render a recipe that has nested ingredients.', async () => {
		const nestedIngredientA = chance.word({ syllables: 5 })
		const nestedIngredientB = chance.word({ syllables: 5 })
		const nestedIngredientC = chance.word({ syllables: 5 })
		const nestedIngredientD = chance.word({ syllables: 5 })

		const multiStepIngredients = {
			[chance.word({ syllables: 4 })]: [nestedIngredientA, nestedIngredientB],
			[chance.word({ syllables: 4 })]: [nestedIngredientC, nestedIngredientD],
		}

		const headers = new Headers()
		headers.set('content-type', 'application/json')
		global.fetch = jest.fn(() => Promise.resolve({
			json: () => Promise.resolve({
				...recipe,
				ingredients: multiStepIngredients,
			}),
			ok: true,
			status: 200,
			headers,
		} as Response))

		const { getByText } = render(<Recipe fileName={chance.word()} />)

		await waitFor(() => {
			expect(getByText(nestedIngredientA)).toBeInTheDocument()
			expect(getByText(nestedIngredientB)).toBeInTheDocument()
			expect(getByText(nestedIngredientC)).toBeInTheDocument()
			expect(getByText(nestedIngredientD)).toBeInTheDocument()
		})
	})
})
