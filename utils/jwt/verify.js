const jwt = require("jsonwebtoken");

function verify(token) {
  jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = verify;
