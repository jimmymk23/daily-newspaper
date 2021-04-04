import mongodb from 'mongodb';
const MongoClient = mongodb.MongoClient;

export default function handler(req, res) {
	const { id } = req.query;
	const client = new MongoClient(process.env.CONNECTION_STRING, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
	client.connect(async (err) => {
		const collection = await client.db('DailyTesticle').collection('posts');
		const post_array = await collection
			.find({ status: 'published', _id: new mongodb.ObjectId(id) })
			.toArray();
		const post = post_array[0];
		res.send(post);
		client.close();
	});
}
