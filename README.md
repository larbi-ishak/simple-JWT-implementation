# JWT Authentication Project

This project demonstrates how to implement JWT authentication using the jsonwebtoken library.

## Dependencies

* dotenv
* express
* jsonwebtoken

## How it works

The project uses the following steps to implement JWT authentication:

1. The user makes a login POST request.
2. The server authenticates the user and generates a token.
3. The server returns the token to the user.
4. The user stores the token in their browser or on the server.
5. The user makes a GET request to the `/posts` endpoint.
6. The server verifies the token and returns the posts that the user is authorized to see.

## Code

```javascript
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');

app.use(express.json());

// Create a list of posts
const posts = [
  {
    "username": "ishak",
    "title": "post 1",
  },
  {
    "username": "moad",
    "title": "post 2",
  },
];

// Authenticate user
app.post('/login', (req, res) => {
  const username = req.body.username;
  const user = { "name": username };

  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
  return res.json({ "accessToken": accessToken });
});

// Verify token
app.get('/posts', authenticateToken, (req, res) => {
  res.json(posts.filter((post) => post.username === req.user.name));
});

// Middleware to verify token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }

    req.user = user;
    next();
  });
}

app.listen(3000);
