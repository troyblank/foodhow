import Chance from 'chance'
import { isAShoppingListLegendEmoji } from './shoppingListLegend'

describe('Shopping list legend utils', () => {
	const chance = new Chance()

	it.each(['🍎', '🥦', '🧂', '🐑', '💀', '❤️', '👍🏽', '👨‍👩‍👧'])('Accepts a single emoji: %s', (emoji) => {
		expect(isAShoppingListLegendEmoji(emoji)).toBe(true)
	})

	it('Accepts a single flag emoji.', () => {
		expect(isAShoppingListLegendEmoji('🇺🇸')).toBe(true)
	})

	it('Ignores surrounding whitespace around the emoji.', () => {
		expect(isAShoppingListLegendEmoji('  🍎 ')).toBe(true)
	})

	it('Rejects an empty value.', () => {
		expect(isAShoppingListLegendEmoji('')).toBe(false)
		expect(isAShoppingListLegendEmoji('   ')).toBe(false)
	})

	it('Rejects more than one emoji.', () => {
		expect(isAShoppingListLegendEmoji('🍎🥦')).toBe(false)
	})

	it('Rejects plain letters and words.', () => {
		expect(isAShoppingListLegendEmoji('a')).toBe(false)
		expect(isAShoppingListLegendEmoji(chance.word())).toBe(false)
	})

	it('Rejects a single digit.', () => {
		expect(isAShoppingListLegendEmoji('7')).toBe(false)
	})
})
