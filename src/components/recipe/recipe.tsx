import React, { useEffect, useState, type FunctionComponent } from 'react'
import dompurify from 'dompurify'
import { isArray } from 'lodash'
import { Directions, IngredientList } from '..'

export function objectifyIngredients(polymorphicIngredients) {
	// ingredients can be an array or object:
	// this converts all to an object for easy parsing.
	let ingredients = polymorphicIngredients

	if (isArray(ingredients)) {
		ingredients = { '': [...ingredients] }
	}

	return ingredients
}

type RecipeProps = {
    fileName: string
}

export const Recipe: FunctionComponent<RecipeProps> = ({ fileName }) => {
	const [recipe, setRecipe] = useState(null)
	const [loadError, setLoadError] = useState(false)

	useEffect(() => {
		fetch(`/recipes/${fileName}.json`)
			.then((response) => {
				setLoadError(false)
				const contentType = response.headers.get('content-type')
				if (!response.ok || !contentType?.includes('application/json')) {
					return Promise.reject(new Error('Recipe not found'))
				}
				return response.json()
			})
			.then((fetchedRecipe) => {
				setRecipe(fetchedRecipe)
			})
			.catch(() => {
				setRecipe(null)
				setLoadError(true)
			})
	}, [fileName])

	if (loadError) return <p className={'recipe recipe--error'}>Recipe not found.</p>
	if (!recipe) return null

	const { title, meta, ingredients: polymorphicIngredients, directions } = recipe
	const ingredients = objectifyIngredients(polymorphicIngredients)
	const ingredientTitles = Object.keys(ingredients)

	return (
		<section className={'recipe'}>
			<header>
				<h1>{ title }</h1>
				{ meta && <h3 dangerouslySetInnerHTML={{ __html: dompurify.sanitize(meta) }} /> }
			</header>
			<section>
				<h2>Ingredients</h2>
				{ ingredientTitles.map((ingredientTitle) => (
					<IngredientList
						title={ingredientTitle}
						ingredients={ingredients[ingredientTitle]}
						fileName={fileName}
						key={ingredientTitle}
					/>
				))}
			</section>
			<section>
				<h2>Directions</h2>
				<Directions steps={directions} />
			</section>
		</section>
	)
}
