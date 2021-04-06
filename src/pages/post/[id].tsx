import Link from 'next/link';
import { formatDate } from '../../util';
import Head from 'next/head';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';

import { Parser } from 'html-to-react';
const htmlToReactParser = new Parser();

import mongodb from 'mongodb';
const MongoClient = mongodb.MongoClient;

const Post = ({ post }) => {
	return (
		<>
			<Head>
				<title>Daily Newspaper: {post.title}</title>
				<meta name='author' content={post.authorName} />
			</Head>
			<Nav />
			<article className='post' id={post.id}>
				<h1 className='title'>{post.title}</h1>
				<h4 className='author'>By {post.authorName}</h4>
				<p className='published-date'>{formatDate(post.published)}</p>
				<div className='body'>{htmlToReactParser.parse(post.body)}</div>
			</article>
            <Footer />
		</>
	);
};

export const getStaticPaths = async () => {
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
	const id_array = posts_array.map((post: any) => String(post._id));
	console.log(id_array);

	client.close();

	return {
		paths: id_array.map((id) => {
			return { params: { id } };
		}),
		fallback: false,
	};
};

export const getStaticProps = async ({ params }) => {
	// GET POST
	const client = new MongoClient(process.env.CONNECTION_STRING, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});

	const connected_client = await client.connect();
	const posts_collection = connected_client
		.db('DailyTesticle')
		.collection('posts');
	const post_array = await posts_collection
		.find({ _id: new mongodb.ObjectID(params.id) })
		.toArray();
	console.log(post_array);
	let post = JSON.parse(JSON.stringify(post_array[0]));

	// GET AUTHOR
	const users_collection = connected_client
		.db('DailyTesticle')
		.collection('users');
	const author_array = await users_collection
		.find({ _id: new mongodb.ObjectID(post.authorId) })
		.toArray();
	const author = JSON.parse(JSON.stringify(author_array[0]));

	const formatted_post = {
		...post,
		authorName: author.penName
			? author.penName
			: `${author.fName} ${author.lName}`,
	};

	client.close();

	return {
		props: { post: formatted_post },
	};
};

export default Post;
