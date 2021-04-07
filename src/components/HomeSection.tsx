import Feed from './Feed';

const HomeSection = ({ posts }) => {
	return (
		<div className='home-grid'>
			<Feed
				type='article'
				feedPosts={posts.filter((p) => posts.indexOf(p) % 2 === 0 )}
			/>
			<Feed
				type='review'
				feedPosts={posts.filter((p) => posts.indexOf(p) % 2 === 1 )}
			/>
		</div>
	);
};

export default HomeSection;
