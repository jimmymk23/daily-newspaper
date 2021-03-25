const router = require('express').Router();
const client = require('../index.js');
const mongodb = require('mongodb');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { ensureTokenExists } = require('./authMiddleware');
const dotenv = require('dotenv');
dotenv.config();

const db = client.db();
const usersDB = db.collection('users');

function checkInput(entry) {
	return entry && entry.trim() !== '';
}

// User signs up
router.post('/signup', async (req, res) => {
	const user = req.body;
	// If the user filled out the form correctly
	if (Object.values(user).every(checkInput)) {
		// Check to see if username already exists in database
		const usernameDocs = await usersDB
			.find({ username: user.username.toLowerCase() })
			.toArray();
		if (usernameDocs.length === 0) {
			// If the username is AVAILABE
			// Hash password
			bcrypt.hash(user.password, 10, async (err, hash) => {
				if (err) {
					console.log(err);
					res.json({
						message:
							'Error while encrypting password. Please try again.',
					});
				}
				// Store user in database
				const registeredUser = await usersDB.insertOne({
					...user,
					username: user.username.toLowerCase(),
					password: hash,
					role: 'user',
				});
				// When the new user is added to the database
				const token = jwt.sign(
					{
						userId: registeredUser.ops[0]._id,
					},
					process.env.AUTH_KEY
				);
				res.json({
					token: token,
					id: registeredUser.ops[0]._id,
				});
			});
		} else {
			// If the username is NOT AVAILABLE
			// Tell user their username is not available
			res.json({
				message: 'Username already taken. Please pick a different one.',
			});
		}
		// });
	} else {
		// The user did NOT fill out the form correctly
		res.json({ message: 'All fields must be filled out.' });
	}
});

router.post('/login', async (req, res) => {
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
});

router.get('/information', ensureTokenExists, (req, res) => {
	jwt.verify(req.token, process.env.AUTH_KEY, async (err, data) => {
		if (err) {
			res.sendStatus(403);
		} else {
			// Get the user info
			const filter = { _id: mongodb.ObjectId(data.userId) };
			const userList = await usersDB.find(filter).toArray();
			const user = userList[0];
			res.json({
				fName: user.fName,
				lName: user.lName,
				username: user.username,
				penName: user.penName,
			});
		}
	});
});

router.post('/information', ensureTokenExists, (req, res) => {
	jwt.verify(req.token, process.env.AUTH_KEY, async (err, data) => {
		if (err) {
			res.sendStatus(403);
		} else {
			const filter = { _id: mongodb.ObjectId(data.userId) };
			const updatedUser = await usersDB.updateOne(filter, {
				$set: req.body,
			});
			res.json({ message: 'Successfully saved.' });
		}
	});
});

router.get('/validate-user', ensureTokenExists, (req, res) => {
	jwt.verify(req.token, process.env.AUTH_KEY, async (err, data) => {
		if (err) {
			res.sendStatus(403);
		} else {
			res.sendStatus(200);
		}
	});
});

module.exports = router;
