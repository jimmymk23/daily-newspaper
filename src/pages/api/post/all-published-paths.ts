import mongodb from 'mongodb';
const MongoClient = mongodb.MongoClient;

export default function handler(req, res) {
	const client = new MongoClient(process.env.CONNECTION_STRING, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
	client.connect(async (err) => {
		const collection = await client.db('DailyTesticle').collection('posts');
		const posts = await collection.find({ status: 'published' }).toArray();
		const ids = posts.map((post: any) => {
			return { id: post._id };
		});
		res.send(ids);
		client.close();
	});
}
