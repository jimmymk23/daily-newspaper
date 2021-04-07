import fetch from 'node-fetch';

import Head from 'next/head';
import Nav from '../components/Nav';
import HomeSection from '../components/HomeSection';
import Footer from '../components/Footer';

const index = ({ posts }) => {
	return (
		<>
			<Head>
				<title>Daily Newspaper</title>
			</Head>
			<Nav />
			<HomeSection posts={posts} />
			<Footer />
		</>
	);
};

export const getStaticProps = async () => {
	const response = await fetch('https://jsonplaceholder.typicode.com/posts');
	const posts = await response.json();

	return {
		props: { posts },
	};
};

export default index;
