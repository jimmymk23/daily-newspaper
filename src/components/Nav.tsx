import { useState, useEffect } from 'react';
import Link from 'next/link';
import Cookie from 'js-cookie';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

const Nav = () => {
	// State
	const [navOpen, setNavOpen] = useState(false);
	const [token, setToken] = useState(
		Cookie.get('token') ? JSON.parse(Cookie.get('token')) : false
	);

	// Page Location URL
	let location = useRouter().pathname;

	// Effects
	// useEffect(() => {
	// 	token = Cookie.get('token') ? JSON.parse(Cookie.get('token')) : false;
	// }, []);
	useEffect(() => {
		setToken(Cookie.get('token') ? JSON.parse(Cookie.get('token')) : false);
	}, [location]);

	// Handlers
	const logoutHandler = () => {
		Cookie.remove('token');
	};

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
				{token ? (
					<>
						<Link href='/compose'>
							<a
								onClick={() => setNavOpen(false)}
								className='nav-link'
							>
								Compose
							</a>
						</Link>
						{/* <Link
							to='/drafts'
							onClick={() => setNavOpen(false)}
							className='nav-link'
						>
							Drafts
						</Link> */}
						<Link href='/account'>
							<a
								onClick={() => setNavOpen(false)}
								className='nav-link'
							>
								Account
							</a>
						</Link>
						<Link href='/'>
							<a
								onClick={() => {
									setNavOpen(false);
									logoutHandler();
								}}
								className='nav-link auth-nav-link'
							>
								Logout
							</a>
						</Link>
					</>
				) : (
					<>
						<Link href='/signup'>
							<a
								onClick={() => setNavOpen(false)}
								className='nav-link auth-nav-link'
							>
								Sign Up
							</a>
						</Link>
						<Link href='/login'>
							<a
								onClick={() => setNavOpen(false)}
								className='nav-link auth-nav-link'
							>
								Sign In
							</a>
						</Link>
					</>
				)}
			</nav>
		</header>
	);
};

export default Nav;
