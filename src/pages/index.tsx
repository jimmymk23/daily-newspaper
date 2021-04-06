import Head from 'next/head';
import Nav from '../components/Nav';
import HomeSection from '../components/HomeSection';
import Footer from '../components/Footer';

import mongodb from 'mongodb';
const MongoClient = mongodb.MongoClient;

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
	const client = new MongoClient(process.env.CONNECTION_STRING, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});

	const connected_client = await client.connect();
	const posts_collection = connected_client
		.db('DailyTesticle')
		.collection('posts');
	const posts_array = await posts_collection
		.find({ status: 'published' })
		.toArray();

	client.close();

	return {
		props: { posts: JSON.parse(JSON.stringify(posts_array.reverse())) },
	};
};

export default index;
