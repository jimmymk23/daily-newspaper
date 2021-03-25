import React from 'react';
import Feed from './post/Feed';

export default function HomeSection() {
	return (
		<div className='home-grid'>
			<Feed type='article' />
			<Feed type='review' />
		</div>
	);
}
