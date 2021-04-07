import fetch from 'node-fetch';

import randomSentence from 'random-sentence';

import { Parser } from 'html-to-react';
const htmlToReactParser = new Parser();

import { capitalize } from '../../util';

import Head from 'next/head';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';

const Post = ({ post }) => {
	return (
		<>
			<Head>
				<title>Daily Newspaper: {capitalize(post.title)}</title>
				<meta name='author' content={post.authorName} />
			</Head>
			<Nav />
			<article className='post' id={post.id}>
				<h1 className='title'>{capitalize(post.title)}</h1>
				<h4 className='author'>By {post.author}</h4>
				<div className='body'>{htmlToReactParser.parse(post.body)}</div>
			</article>
			<Footer />
		</>
	);
};

export const getStaticPaths = async () => {
	const response = await fetch('https://jsonplaceholder.typicode.com/posts');
	const posts_array = await response.json();
	const id_array = posts_array.map((post) => {
		return post.id;
	});

	return {
		paths: id_array.map((id) => {
			return { params: { id: String(id) } };
		}),
		fallback: false,
	};
};

export const getStaticProps = async ({ params }) => {
	// GET POST
	const posts_response = await fetch(
		'https://jsonplaceholder.typicode.com/posts'
	);
	const posts_array = await posts_response.json();
	const [post] = posts_array.filter((post) => String(post.id) === params.id);

	// GET AUTHOR
	const users_response = await fetch(
		'https://jsonplaceholder.typicode.com/users'
	);
	const users_array = await users_response.json();
	const [user] = users_array.filter((user) => user.id === post.userId);

	// FORMAT BODY
	const paragraphs = Math.floor(Math.random() * 10) + 3;
	let formatted_body = '';
	for (let i = 0; i < paragraphs; i++) {
        const sentences = Math.floor(Math.random() * 5) + 1;
        let this_paragraph = '<p>';
        for (let i = 0; i < sentences; i++) {
            this_paragraph += randomSentence({min: 7, max: 15}) + ' ';
        }
        this_paragraph += '</p>';
        formatted_body += this_paragraph;        
    }

	const formatted_post = {
		...post,
		author: user.name,
		body: formatted_body,
	};

	return {
		props: { post: formatted_post },
	};
};

export default Post;
