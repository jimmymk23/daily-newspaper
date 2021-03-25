import React, { useState, useEffect, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Loading from './Loading';

export default function Account() {
    const history = useHistory();

	// Refs
	const messageElementRef = useRef(null);
	const fNameInputRef = useRef(null);
	const lNameInputRef = useRef(null);
	const usernameInputRef = useRef(null);

	// State
	const [fName, setFName] = useState('');
	const [lName, setLName] = useState('');
	const [penName, setPenName] = useState('');
	const [username, setUsername] = useState('');
	const [fieldsFilled, setFieldsFilled] = useState(true);
	const [isLoading, setIsLoading] = useState(false);

	// Effects
	useEffect(() => {
		setIsLoading(true);
		// Send token to Backend to get user info
		fetch('/api/user/information', {
			method: 'GET',
			headers: {
				authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		})
			.then((response) => {
				if (response.status === 403) history.push('/');
				return response.json();
			})
			.then(({ fName, lName, penName, username }) => {
				setIsLoading(false);
				if (fName) setFName(fName);
				if (lName) setLName(lName);
				if (penName) setPenName(penName);
				if (username) setUsername(username);
			});
	}, []);

	// Detect if fields are empty
	useEffect(() => {
		fNameInputRef.current.style.background =
			fName.trim().length === 0 ? '#ffbfbf' : 'white';
		setFieldsFilled(fName.trim().length === 0 ? false : true);
	}, [fName]);
	useEffect(() => {
		lNameInputRef.current.style.background =
			lName.trim().length === 0 ? '#ffbfbf' : 'white';
		setFieldsFilled(lName.trim().length === 0 ? false : true);
	}, [lName]);
	useEffect(() => {
		usernameInputRef.current.style.background =
			username.trim().length === 0 ? '#ffbfbf' : 'white';
		setFieldsFilled(username.trim().length === 0 ? false : true);
	}, [username]);

	// Handler
	const saveHandler = (e) => {
		e.preventDefault();

		if (fieldsFilled) {
			// Build User Info Object
			const userInfo = {
				fName: fName,
				lName: lName,
				penName: penName,
				username: username,
			};

			// Send to Backend to save
			fetch('/api/user/information', {
				method: 'POST',
				headers: {
					authorization: `Bearer ${localStorage.getItem('token')}`,
					'content-type': 'application/json',
				},
				body: JSON.stringify(userInfo),
			})
				.then((response) => response.json())
				.then((res) => {
					messageElementRef.current.textContent = res.message;
					messageElementRef.current.style.color = '#009900';
				});
		} else {
			messageElementRef.current.textContent =
				'Sorry, there are empty fields which are required. Please fill them out before saving.';
			messageElementRef.current.style.color = 'red';
		}
	};

	return (
		<div id='account-page'>
			{isLoading ? (
				<Loading />
			) : (
				<form>
					<h2>Your user information</h2>

					<label htmlFor='fName'>First Name</label>
					<input
						value={fName}
						onChange={(e) => setFName(e.target.value)}
						type='text'
						name='fName'
						id='fName-input'
						ref={fNameInputRef}
					/>

					<label htmlFor='lName'>Last Name</label>
					<input
						value={lName}
						onChange={(e) => setLName(e.target.value)}
						type='text'
						name='lName'
						id='lName-input'
						ref={lNameInputRef}
					/>

					<label htmlFor='penName'>Pen Name</label>
					<input
						value={penName}
						onChange={(e) => setPenName(e.target.value)}
						type='text'
						name='penName'
						id='penName-input'
					/>
					<p className='note'>
						If you don't want your real name associated with the
						content you post on this site, you can set a pen name to
						appear instead.
					</p>

					<label htmlFor='username'>Userame</label>
					<input
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						type='text'
						name='username'
						id='username-input'
						ref={usernameInputRef}
					/>

					<p className='message' ref={messageElementRef} />

					<div className='button-list'>
						<button
							onClick={saveHandler}
							className='button'
							id='save-button'
							type='submit'
						>
							Save
						</button>
						<Link to='/' className='button'>
							Cancel
						</Link>
					</div>
				</form>
			)}
		</div>
	);
}
