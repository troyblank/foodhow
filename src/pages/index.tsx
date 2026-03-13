// @ts-nocheck // remove when removing reducers
import React, { Fragment, type FunctionComponent } from 'react'
import { type GetServerSidePropsContext } from 'next'
import { type User } from '../types'
import { AuthProvider } from '../contexts'
import { recipes } from '../../public/recipes.json'
import { Head, Navigation, RecipeList } from '../components'
import { getRedirectToShoppingListIfDirectLoad, getServerSidePropsWithoutAuthRedirect } from '../utils'

export const getServerSideProps = async (serverSideContext: GetServerSidePropsContext) => {
	const redirect = getRedirectToShoppingListIfDirectLoad(serverSideContext)
	if (redirect) return redirect
	return getServerSidePropsWithoutAuthRedirect(serverSideContext)
}

export const HomePage: FunctionComponent = ({ user }: { user: User }) => (
	<AuthProvider user={user}>
		<Fragment>
			<Head />
			<Navigation />
			<RecipeList recipes={recipes} />
		</Fragment>
	</AuthProvider>
)

export default HomePage
