# JWT Authentication Project

This project demonstrates how to implement JWT authentication using the jsonwebtoken library.

## Dependencies

- dotenv
- express
- jsonwebtoken

## How it works

The project uses the following steps to implement JWT authentication:

1. The user makes a login POST request.
2. The server authenticates the user and generates a token.
3. The server returns the token to the user.
4. The user stores the token in their browser or on the server.
5. The user makes a GET request to the `/posts` endpoint.
6. The server verifies the token and returns the posts that the user is authorized to see.

## Code

```python
import dotenv
import express
import jsonwebtoken

app = express()
app.use(express.json())

# Load environment variables from .env file
dotenv.config()

# Create a list of posts
posts = [
  {
    "username": "ishak",
    "title": "post 1",
  },
  {
    "username": "moad",
    "title": "post 2",
  },
]

# Authenticate user
@app.post("/login")
def login():
  username = request.body.username
  user = { "name": username }

  accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
  return jsonify({ "accessToken": accessToken })

# Verify token
@app.get("/posts", authenticateToken)
def get_posts():
  res.json(posts.filter((post) => post.username === req.user.name))

# Middleware to verify token
def authenticateToken(req, res, next):
  authHeader = req.headers["authorization"]
  token = authHeader.split(" ")[1]

  if token == null:
    return res.sendStatus(401)

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if err:
      return res.sendStatus(403)

    req.user = user
    next()
  })

# Start server
app.listen(3000)
```
"# simple-JWT-implementation" 
