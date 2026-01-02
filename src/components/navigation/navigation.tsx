import React, { type FunctionComponent } from 'react';
import Link from 'next/link';
import { useAuth } from '../../contexts';

export const Navigation: FunctionComponent = () => {
	const { user } = useAuth();

	return (
		<nav className={'navigation'}>
			<div className={'navigation__wrapper'}>
				{user && (
					<Link href={'/shoppingList'} prefetch={true} className={'navigation__list'}>
						list
					</Link>
				)}
				<Link href={'/guide'} prefetch={true} className={'navigation__guide'}>
					guide
				</Link>
				<Link href={'/'} className={'navigation__home'}>
					home
				</Link>
			</div>
			{!user && (
				<Link href={'/signIn'} className={'navigation__signin'}>
					Sign In
				</Link>
			)}
		</nav>

	);
};
