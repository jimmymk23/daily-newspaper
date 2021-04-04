import Link from 'next/link';
const cheerio = require('cheerio');

export default function Preview({ post }) {
	const preview_length = 150; // Characters

	const $ = cheerio.load(post.body);
	const body_text =
		$.text().length > preview_length
			? $.text().substring(0, preview_length) + ' ...'
			: $.text();

	return (
		<Link href={`/post/${post._id}`}>
			<a id={post._id} className='preview'>
				<p className='title'>{post.title}</p>
				<p className='text'>{body_text}</p>
			</a>
		</Link>
	);
}
