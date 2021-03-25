import React from 'react';
import { Link } from 'react-router-dom';
// import { formatDate } from '../../util.js';

export default function Preview({ post }) {
	return (
		<Link to={`/post/${post._id}`} id={post._id} className='preview'>
			<p className='title'>{post.title}</p>
			{/* <p className='date'>{formatDate(post.published)}</p>
			<p className='views'>
				{post.viewCount} view{post.viewCount === 1 ? '' : 's'}
			</p> */}
			<p className='text'>{post.body}</p>
		</Link>
	);
}