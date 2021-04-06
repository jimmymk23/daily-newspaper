import mongodb from 'mongodb';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

function checkInput(entry) {
	return entry && entry.trim() !== '';
}

export default async function handler(req, res) {
	const client = new mongodb.MongoClient(process.env.CONNECTION_STRING, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
	const connected_client = await client.connect();
	const usersDB = connected_client.db().collection('users');

	const user = req.body;
	// If the user filled out the form correctly
	if (Object.values(user).every(checkInput)) {
		// Check to see if username already exists in database
		const foundUser = await usersDB
			.find({ username: user.username.toLowerCase() })
			.toArray();
		if (foundUser.length > 0) {
			// If the username DOES EXIST
			// Check password matched password on file
			bcrypt.compare(
				user.password,
				foundUser[0].password,
				async (err, result) => {
					if (err) {
						console.log(err);
						res.json({
							message:
								'Sorry, there was an error checking your password. Please try again.',
						});
					}
					if (result) {
						// If the password is a match
						const token = jwt.sign(
							{
								userId: foundUser[0]._id,
							},
							process.env.AUTH_KEY
						);
						// Send the token to the client
						res.json({ token });
					} else {
						// If the password does NOT match
						res.json({
							message:
								"Sorry, that's the wrong password. Please try again.",
						});
					}
				}
			);
		} else {
			// If the username DOES NOT EXIST
			// Tell user their username is not correct
			res.json({
				message:
					'This user does not exist. Please check for typos or create an account.',
			});
		}
	} else {
		// The user did NOT fill out the form correctly
		res.json({ message: 'All fields must be filled out.' });
	}
}
