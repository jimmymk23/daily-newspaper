import React from 'react';
import icon404 from '../assets/404.svg';

const PageNotFount = () => {
	return (
		<div className='page-not-found'>
			<img src={icon404} />
			{/* <div>Icons made by <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div> */}
			<h2>Sorry, looks like that page doesn't exist.</h2>
		</div>
	);
};

export default PageNotFount;
