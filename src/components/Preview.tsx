import Link from 'next/link';
import { capitalize } from '../util';

export default function Preview({ post }) {
	return (
		<Link href={`/post/${post.id}`}>
			<a id={post.id} className='preview'>
				<p className='title'>{capitalize(post.title)}</p>
				<p className='text'>{post.body}</p>
			</a>
		</Link>
	);
}
