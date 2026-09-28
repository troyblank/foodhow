// Emoji are often several code units long, so count user perceived characters instead of string length.
export const countCharacters = (value: string): number => Array.from(
	new Intl.Segmenter(undefined, { granularity: 'grapheme' }).segment(value),
).length

// Built with RegExp so the unicode property escapes are not rejected by the es6 compile target.
const PICTOGRAPHIC_PATTERN = new RegExp('\\p{Extended_Pictographic}', 'u')
const REGIONAL_INDICATOR_PATTERN = new RegExp('\\p{Regional_Indicator}', 'u')

// Mirrors the API rule: a legend emoji is exactly one user perceived character that is an emoji or flag.
export const isAShoppingListLegendEmoji = (emoji: string): boolean => {
	const trimmedEmoji = emoji.trim()

	return 1 === countCharacters(trimmedEmoji)
		&& (PICTOGRAPHIC_PATTERN.test(trimmedEmoji) || REGIONAL_INDICATOR_PATTERN.test(trimmedEmoji))
}
