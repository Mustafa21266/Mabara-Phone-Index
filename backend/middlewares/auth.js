const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (req, res, next) => {
  console.log(req.query.token)
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"] || req.cookies.token;
  if (!token) {
    res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, "fghfghw132414as@!");
    req.user = decoded;
    console.log(decoded)
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;
