const router = require('express').Router();
const client = require('../index.js');
const mongodb = require('mongodb');
const jwt = require('jsonwebtoken');
const cheerio = require('cheerio');
const { ensureTokenExists, checkForToken } = require('./authMiddleware');
const dotenv = require('dotenv');
dotenv.config();

const db = client.db();
const postsDB =
	process.env.NODE_ENV === 'production'
		? db.collection('posts')
		: db.collection('devPosts');
const usersDB = db.collection('users');

const getInnerHTML = (htmlString) => {
	const $ = cheerio.load(htmlString);
	const text = $.text();
	return text;
};

router.get('/previews/:type', async (req, res) => {
	// Get the type of post to look up
	const type = req.params.type;
	// Create a filter
	const filter = {
		// Only posts of a vertain type
		type: type,
		// Only PUBLISHED posts
		status: 'published',
	};
	// Set the body preview length
	const bodyCharLength = 150;
	// Get the posts
	const allPosts = await postsDB.find(filter).toArray();
	// Limit the number of posts to a max of 5
	const posts = allPosts.length >= 5 ? allPosts.slice(-5) : allPosts;
	// Format the body of the preview
	const previews = posts.map((post) => {
		const formattedBody =
			getInnerHTML(post.body).length > bodyCharLength
				? getInnerHTML(post.body).substring(0, bodyCharLength) + ' ...'
				: getInnerHTML(post.body) + ' ...';
		return {
			body: formattedBody,
			title: post.title,
			_id: post._id,
		};
	});
	// Return the data to client
	res.json(previews.reverse());
	// setTimeout(() => res.json(previews.reverse()), 2000);
});

router.get('/id/:id', checkForToken, async (req, res) => {
	try {
		// The article to find
		const postFilter = { _id: mongodb.ObjectId(req.params.id) };
		// Get the article
		const postArray = await postsDB.find(postFilter).toArray();
		const post = postArray[0];

        // Author filter
        const authorFilter = { _id: mongodb.ObjectId(post.authorId) };
		// Get the author who wrote the article
        const authorArray = await usersDB.find(authorFilter).toArray();
		const author = authorArray[0];
		// If the author has a pen name, then use that for the display name,
		// if not... just use their first and last name
		post['authorName'] = author.penName
			? author.penName
			: `${author.fName} ${author.lName}`;

		// Check if the user who sent the request is the author
		if (req.token) {
			// If there was a token sent... verify the token
			jwt.verify(req.token, process.env.AUTH_KEY, async (err, data) => {
				if (err) {
					// Handle Errors with response
					res.sendStatus(403);
				} else {
					// If the token is valid
					// Check if the user is the author
					if (data.userId === post.authorId) {
						post['authorIsCurrentUser'] = true;
					}
				}
			});
		}

		// Send the info back to client
		// the one extra view represents the current view which gets added to the DB after the info is already sent to the client
		res.json(post);

		// Increment the article's view count
		await postsDB.updateOne(filter, {
			$set: {
				viewCount: post.viewCount + 1,
			},
		});
	} catch {
		res.sendStatus(404);
		return;
	}
});

router.get('/current-for-edit/:id', async (req, res) => {
	// The article to find
	const filter = { _id: mongodb.ObjectId(req.params.id) };
	// Get the article
	const postArray = await postsDB.find(filter).toArray();
	const post = postArray[0];
	// Send the info back to client
	res.json(post);
});

router.post('/publish', ensureTokenExists, (req, res) => {
	jwt.verify(req.token, process.env.AUTH_KEY, async (err, data) => {
		if (err) {
			res.sendStatus(403);
		} else {
			const newPost = {
				title: req.body.title,
				body: req.body.body,
				type: req.body.type,
				published: new Date(),
				authorId: data.userId,
				viewCount: 0,
				status: req.body.status,
			};
			const answer = await postsDB.insertOne(newPost);
			console.log(answer.insertedId);
			res.json({ postId: answer.insertedId });
		}
	});
});

router.get('/drafts', ensureTokenExists, (req, res) => {
	jwt.verify(req.token, process.env.AUTH_KEY, async (err, data) => {
		if (err) {
			// If the token is not valid, UNAUTHORIZED
			res.sendStatus(403);
		} else {
			// If the user token is valid...
			// get all the DRAFTS from ONLY THAT USER
			const query = { authorId: data.userId, status: 'draft' };
			const draftsArray = await postsDB.find(query).toArray();
			console.log(draftsArray);
		}
	});
});

router.post('/save-to-drafts', ensureTokenExists, (req, res) => {
	jwt.verify(req.token, process.env.AUTH_KEY, async (err, data) => {
		if (err) {
			res.sendStatus(403);
		} else {
			console.log({ user: data.userId, body: req.body });
			// Create the post object
			const newDraft = {
				title: req.body.title,
				body: req.body.body,
				type: req.body.type,
				created: new Date(),
				authorId: data.userId,
				status: 'draft',
			};
			const answer = await postsDB.insertOne(newDraft);
			console.log(answer);
		}
	});
});

router.post('/update', ensureTokenExists, (req, res) => {
	jwt.verify(req.token, process.env.AUTH_KEY, async (err, data) => {
		if (err) {
			res.sendStatus(403);
		} else {
			// The Post to lookup
			const filter = { _id: mongodb.ObjectId(req.body.postId) };
			// Get the post
			const postArray = await postsDB.find(filter).toArray();
			const post = postArray[0];
			// Check if the user (token) is the author
			if (post.authorId === data.userId) {
				// Update the post with the new title and body
				const updatedPost = await postsDB.updateOne(filter, {
					$set: {
						title: req.body.title,
						body: req.body.body,
					},
				});
				// If the update was successful
				if (updatedPost.result.n === 1) {
					// Return the article id
					res.json({ postId: req.body.postId });
				} else {
					// If there was an error saving the post
					res.json({
						message: 'Sorry, the edits could not be saved.',
					});
				}
			} else {
				// If the author is not the user
				res.json({
					message: 'Sorry, only authors can edit their posts.',
				});
			}
		}
	});
});

router.post('/delete', ensureTokenExists, (req, res) => {
	jwt.verify(req.token, process.env.AUTH_KEY, async (err, data) => {
		if (err) {
			res.sendStatus(403);
		} else {
			// The Post to lookup
			const filter = { _id: mongodb.ObjectId(req.body.postId) };
			// Get the post
			const postArray = await postsDB.find(filter).toArray();
			const post = postArray[0];
			// Check if the user (token) is the author
			if (post.authorId === data.userId) {
				// Delete the post
				const deletedPost = await postsDB.deleteOne(filter);
				// Check if a post was deleted
				if (deletedPost.deletedCount === 1) {
					// If the post was deleted
					res.json({ message: 'deleted' });
				} else {
					// If post was not deleted
					res.json({
						message:
							'Sorry, there was an error deleting this post.',
					});
				}
			} else {
				// The user is not the author
				res.json({
					message: 'Sorry, only the author can delete their post.',
				});
			}
		}
	});
});

module.exports = router;
