import React, { useState, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';

const SignInPage = () => {
	// Refs
	const messageElementRef = useRef(null);

	// State
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	// History
	const history = useHistory();

	// Handlers
	const submissionHandler = (e) => {
		e.preventDefault();

		// Create JSON object of user to send to backend
		const userObject = {
			username,
			password,
		};

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
					localStorage.setItem('token', res.token);
					history.push('/');
				} else if (res.message) {
					messageElementRef.current.innerText = res.message;
				}
			});
	};

	return (
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
					<Link to='/signup' className='link'>
						Sign Up
					</Link>
				</p>
			</form>
		</div>
	);
};

export default SignInPage;