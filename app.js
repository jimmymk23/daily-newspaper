const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

const user = require('./routes/user.js');
app.use('/api/user', user);

const post = require('./routes/post.js');
app.use('/api/post', post);

const build_path = './build';
app.use(express.static(build_path));
app.use('*', express.static(build_path));

module.exports = app;
