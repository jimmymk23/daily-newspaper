import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { Parser } from 'html-to-react';
const htmlToReactParser = new Parser();
import { formatDate } from '../../util';
import Loading from '../Loading';

export default function Post() {
	const history = useHistory();
	const { id } = useParams();
	const messageElementRef = useRef(null);

	const [post, setPost] = useState({});
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		const headers = localStorage.getItem('token')
			? {
					authorization: `Bearer ${localStorage.getItem('token')}`,
			  }
			: {};
		fetch(`/api/post/id/${id}`, { headers })
			.then((response) => {
				if (response.status === 404) {
					throw Error();
				} else {
					return response.json();
				}
			})
			.then((res) => {
				setPost(res);
				setIsLoading(false);
			})
			.catch(() => history.push('/404'));
	}, []);

	// Handlers
	const deleteHandler = () => {
		if (
			window.confirm(
				'Are you sure you want to delete this post. You cannot undo this.'
			)
		) {
			fetch('/api/post/delete', {
				method: 'POST',
				headers: {
					authorization: `Bearer ${localStorage.getItem('token')}`,
					'content-type': 'application/json',
				},
				body: JSON.stringify({ postId: id }),
			})
				.then((response) => response.json())
				.then((res) => {
					if (res.message === 'deleted') {
						history.push('/');
					} else {
						messageElementRef.current.textContent = res.message;
					}
				});
		}
	};

	return (
		<>
			<p className='message' ref={messageElementRef} />
			{isLoading ? (
				<Loading />
			) : (
				<article className='post' id={post._id}>
					{post.authorIsCurrentUser ? (
						<div className='button-list'>
							<Link
								to={`/post/edit/${post._id}`}
								className='button'
							>
								Edit
							</Link>
							<button onClick={deleteHandler} className='button'>
								Delete
							</button>
						</div>
					) : (
						''
					)}
					{post.title ? <h1 className='title'>{post.title}</h1> : ''}
					{post.authorName ? (
						<h4 className='author'>By {post.authorName}</h4>
					) : (
						''
					)}
					{post.published ? (
						<p className='published-date'>
							{formatDate(post.published)}
						</p>
					) : (
						''
					)}
					{post.body ? (
						<div className='body'>
							{htmlToReactParser.parse(post.body)}
						</div>
					) : (
						''
					)}
				</article>
			)}
		</>
	);
}
