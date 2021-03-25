import React, { useState, useEffect } from 'react';
import Preview from './Preview';
import Loading from '../Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSadTear } from '@fortawesome/free-solid-svg-icons';

export default function Feed({ type }) {
	// State
	const [previews, setPreviews] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	// Effects
	useEffect(() => {
		//load article previews
		// Put loading gif
		setIsLoading(true);
		// Call the backend for previews
		fetch(`/api/post/previews/${type}`)
			.then((response) => response.json())
			.then((res) => {
				// Stop loading gif
				setIsLoading(false);
				// Add previews to state
				setPreviews(res);
			});
	}, []);

	return (
		<div className={`feed ${type}-feed`}>
			<h2 className='feed-title'>
				{`${type[0].toUpperCase()}${type.slice(1)}`}s
			</h2>

			{isLoading ? (
				<Loading />
			) : previews.length > 0 ? (
				previews.map((post) => {
					return <Preview post={post} key={post._id} />;
				})
			) : (
                // If there are no posts of this type
                <p className='empty-feed-message'>Sorry, there are no {type}s to show <br /><FontAwesomeIcon icon={faSadTear} /></p>
			)}
		</div>
	);
}
