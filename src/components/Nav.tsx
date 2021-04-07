import { useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

const Nav = () => {
	// State
	const [navOpen, setNavOpen] = useState(false);

	return (
		<header>
			<Link href='/'>
				<a className='website-title'>The Daily News</a>
			</Link>
			<FontAwesomeIcon
				onClick={() => setNavOpen(true)}
				id='hamburger'
				icon={faBars}
				size='lg'
			/>
			<nav className={navOpen ? 'nav-active' : ''}>
				<FontAwesomeIcon
					onClick={() => setNavOpen(false)}
					icon={faTimes}
					id='close-nav-button'
					size='lg'
				/>
				<Link href='/'>
					<a onClick={() => setNavOpen(false)} className='nav-link'>
						Home
					</a>
				</Link>
			</nav>
		</header>
	);
};

export default Nav;
