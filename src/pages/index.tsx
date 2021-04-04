import Head from 'next/head';
import fetch from 'node-fetch';
import Cookie from 'js-cookie';
import Nav from '../components/Nav';
import HomeSection from '../components/HomeSection';

const index = ({ posts }) => {
	// Handlers
	const logoutHandler = () => {
		Cookie.remove('token');
	};

	return (
		<>
			<Head>
				<title>Daily Newspaper</title>
			</Head>
			<Nav logoutHandler={logoutHandler} />
			<HomeSection posts={posts} />
		</>
	);
};

export const getStaticProps = async () => {
	const response = await fetch(
		'http://localhost:3000/api/post/all-published'
	);
	const posts_array = await response.json();

	const posts = [
		{
			title: 'Title 1',
			body:
				'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Excepturi ab maiores, laborum debitis nostrum illo similique facilis quia. Id, nihil?',
			type: 'article',
			_id: '616w5f1w68rf41w6',
		},
		{
			title: 'Title 2',
			body:
				'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Excepturi ab maiores, laborum debitis nostrum illo similique facilis quia. Id, nihil?',
			type: 'review',
			_id: '616w5f1868rf41w6',
		},
		{
			title: 'Title 3',
			body:
				'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Excepturi ab maiores, laborum debitis nostrum illo similique facilis quia. Id, nihil?',
			type: 'article',
			_id: '616w5f1w68rf4h1w6',
		},
	];

	return {
		props: { posts: posts_array },
	};
};

export default index;
