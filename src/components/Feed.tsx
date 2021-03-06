import Preview from './Preview';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSadTear } from '@fortawesome/free-solid-svg-icons';

interface FeedProps {
	type: string;
	feedPosts: Array<Object>;
}

export default function Feed({ type, feedPosts }: FeedProps) {
	return (
		<div className={`feed ${type}-feed`}>
			<h2 className='feed-title'>
				{`${type[0].toUpperCase()}${type.slice(1)}`}s
			</h2>

			{feedPosts.length > 0 ? (
				feedPosts.map((post: any) => {
					return <Preview post={post} key={post.id} />;
				})
			) : (
				// If there are no posts of this type
				<p className='empty-feed-message'>
					Sorry, there are no {type}s to show <br />
					<FontAwesomeIcon icon={faSadTear} />
				</p>
			)}
		</div>
	);
}
