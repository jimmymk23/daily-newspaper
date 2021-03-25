import React, { useState, useEffect } from 'react';
import Feed from './post/Feed';

const Drafts = () => {
	// STATE
	const [drafts, setDrafts] = useState(null);

	// EFFECTS
	// Load drafts from backend
	useEffect(() => {
		fetch('/api/post/drafts', {
			headers: {
				authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		})
			.then((response) => response.json())
			.then((res) => console.log(res))
			.catch((err) => console.log(err));
	}, []);

	return (
		<div id='drafts'>
			<div className='container'>
				<h1>Drafts</h1>
			</div>
		</div>
	);
};

export default Drafts;
