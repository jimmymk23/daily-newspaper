import Feed from './post/Feed';

const HomeSection = ({ posts }) => {
	return (
		<div className='home-grid'>
			<Feed
				type='article'
				feedPosts={posts.filter((p) => p.type === 'article')}
			/>
			<Feed
				type='review'
				feedPosts={posts.filter((p) => p.type === 'review')}
			/>
		</div>
	);
};

export default HomeSection;
