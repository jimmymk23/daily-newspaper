import { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import Cookie from 'js-cookie';

import Link from 'next/link';
import Nav from '../components/Nav';

const login = () => {
	// Refs
	const messageElementRef = useRef(null);

	// State
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	// History
	const router = useRouter();

	// Handlers
	const submissionHandler = (e) => {
		e.preventDefault();

		// Create JSON object of user to send to backend
		const userObject = { username, password };

		fetch('/api/user/login', {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
			},
			body: JSON.stringify(userObject),
		})
			.then((response) => response.json())
			.then((res) => {
				if (res.token) {
					Cookie.set('token', JSON.stringify(res.token));
					router.push('/');
				} else if (res.message) {
					messageElementRef.current.innerText = res.message;
				}
			});
	};

	return (
		<>
			<Nav />
			<div id='signin-page'>
				<form>
					<h2>Sign In</h2>

					<p className='message' ref={messageElementRef} />

					<label htmlFor='username'>Userame</label>
					<input
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						type='text'
						name='username'
						id='username-input'
					/>

					<label htmlFor='password'>Password</label>
					<input
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						type='password'
						name='password'
						id='password-input'
					/>

					<p className='other-options'>
						<button
							onClick={submissionHandler}
							className='button'
							id='submit-button'
							type='submit'
						>
							Sign In
						</button>{' '}
						or{' '}
						<Link href='/signup'>
							<a className='link'>Sign Up</a>
						</Link>
					</p>
				</form>
			</div>
		</>
	);
};

export default login;
