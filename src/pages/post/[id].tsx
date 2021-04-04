import Link from 'next/link';
import fetch from 'node-fetch';
import { formatDate } from '../../util';

const Post = ({ post }) => {
	console.log(post);
	return (
		<article className='post' id={post.id}>
			<h1 className='title'>{post.title}</h1>
			<h4 className='author'>By {post.authorName}</h4>
			<p className='published-date'>{formatDate(post.published)}</p>
		</article>
	);
};

export const getStaticProps = async ({ params }) => {
	const response = await fetch(`http://localhost:3000/api/post/${params.id}`);
	const post = await response.json();

	return {
		props: { post },
	};
};

export const getStaticPaths = async () => {
	const response = await fetch(
		'http://localhost:3000/api/post/all-published-paths'
	);
	const ids = await response.json();

	return {
		paths: ids.map((item) => {
			return { params: { id: item.id } };
		}),
		fallback: false, // See the "fallback" section below
	};
};

export default Post;
