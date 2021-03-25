import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

export default function Nav({ logoutHandler }) {
    let token = localStorage.getItem('token') ? localStorage.getItem('token') : false;

	// State
	const [navOpen, setNavOpen] = useState(false);

	// Page Location URL
	let location = useLocation();

	// Effects
	useEffect(() => {
        token = localStorage.getItem('token') ? localStorage.getItem('token') : false;
    }, [location]);

	return (
		<header>
			<Link to='/' className='website-title'>
				The Daily News
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
				<Link
					to='/'
					onClick={() => setNavOpen(false)}
					className='nav-link'
				>
					Home
				</Link>
				{token ? (
					<>
						<Link
							to='/compose'
							onClick={() => setNavOpen(false)}
							className='nav-link'
						>
							Compose
						</Link>
						<Link
							to='/drafts'
							onClick={() => setNavOpen(false)}
							className='nav-link'
						>
							Drafts
						</Link>
						<Link
							to='/account'
							onClick={() => setNavOpen(false)}
							className='nav-link'
						>
							Account
						</Link>
						<Link
							to='/'
							onClick={() => {
								setNavOpen(false);
								logoutHandler();
							}}
							className='nav-link auth-nav-link'
						>
							Logout
						</Link>
					</>
				) : (
					<>
						<Link
							to='/signup'
							onClick={() => setNavOpen(false)}
							className='nav-link auth-nav-link'
						>
							Sign Up
						</Link>
						<Link
							to='/login'
							onClick={() => setNavOpen(false)}
							className='nav-link auth-nav-link'
						>
							Sign In
						</Link>
					</>
				)}
			</nav>
		</header>
	);
}
