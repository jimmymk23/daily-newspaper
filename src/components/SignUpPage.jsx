import React, { useState, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';

export default function SignUpPage() {
	const messageElementRef = useRef(null);

	// State
	const [fName, setFName] = useState('');
	const [lName, setLName] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	// History
	let history = useHistory();

	// Handlers
	const submissionHandler = (e) => {
		e.preventDefault();

		// Create JSON object of user to send to backend
		const userObject = {
			fName,
			lName,
			username,
			password,
		};

		fetch('/api/user/signup', {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
			},
			body: JSON.stringify(userObject),
		})
			.then((response) => response.json())
			.then((res) => {
				console.log(res);
				if (res.token) {
					localStorage.setItem('token', res.token);
					history.push('/');
				}
				if (res.message) {
					messageElementRef.current.innerText = res.message;
				}
			});
	};

	return (
		<div id='signup-page'>
			<form onSubmit={submissionHandler}>
				<h2>Create an account</h2>

				<p className='message' ref={messageElementRef} />

				<label htmlFor='fName'>First Name</label>
				<input
					value={fName}
					onChange={(e) => setFName(e.target.value)}
					type='text'
					name='fName'
					id='fName-input'
				/>

				<label htmlFor='lName'>Last Name</label>
				<input
					value={lName}
					onChange={(e) => setLName(e.target.value)}
					type='text'
					name='lName'
					id='lName-input'
				/>

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

				<p>
					I am not a cybersecurity expert but I am doing the best I
					can to protect passwords, so please... for the love of god,{' '}
					<span className='emphasis'>
						use a unique password that you don't use anywhere else
					</span>
					. If you're reading this newspaper and would like to
					contribute you're probably too dumb to have known that
					before so now you know, bitch.
				</p>

				<p className='other-options'>
					<button
						// onClick={submissionHandler}
						className='button'
						id='submit-button'
						type='submit'
					>
						Sign Up
					</button>{' '}
					or{' '}
					<Link to='/login' className='link'>
						Sign In
					</Link>
				</p>
			</form>
		</div>
	);
}
