require("dotenv").config();
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
app.use(express.json());

// initilaizing restrictedTokens with empty array
// /login : user gets acces and refersh tokens access token is invalid after 20s
// /token : user gives refresh token and gets new valid access token
// /logout: user logs out sending the refresh token that he have which is pushed to the restrictedTokens

let refreshTokens = [];
app.post("/refreshToken", (req, res) => {
  // espaced step: Authenticate refreshToken
  const refreshToken = req.body.token;
  if (refreshToken == null) return res.sendStatus(401);
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    const accessToken = generateAccessToken({ name: user.name });
    res.json({ accessToken: accessToken });
  });
});

app.post("/login", (req, res) => {
  // TODO
  // ESCAPED STEP: Authenticate user with username and password
  const username = req.body.username;
  const user = { name: username };
  const accessToken = generateAccessToken(user);
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
  refreshTokens.push(refreshToken);
  res.json({ accessToken, refreshToken });
});

app.delete("/logout", (req, res) => {
  refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
  res.sendStatus(204);
});

function generateAccessToken(user) {
  // the token expiresIn 20 second wo you won't be able to fetch posts with that accessToken
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "20s",
  });
}

app.listen(3001);
