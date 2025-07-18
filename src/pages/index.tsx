// @ts-nocheck // remove when removing reducers
import React, { useEffect, type FunctionComponent } from 'react'
// import { GetServerSidePropsContext } from 'next'
// import { AuthProvider } from '../contexts'
import { recipes } from '../../static/recipes.json';
import { Head, Navigation, RecipeList } from '../components'
// import { getServerSidePropsOrRedirect } from '../utils'

// export const getServerSideProps = async (serverSideContext: GetServerSidePropsContext) => getServerSidePropsOrRedirect(serverSideContext)

// export const HomePage = ({ user }: { user: User }) => {

// return (
//     <AuthProvider user={user}>
//         <Balance />
//     </AuthProvider>
// )

export const HomePage: FunctionComponent = () => {
	return (
        <>
            <Head />
            <Navigation />
            <RecipeList recipes={recipes} />
        </>
	)
}

export default HomePage
