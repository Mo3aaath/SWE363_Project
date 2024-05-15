const jwt = require("jsonwebtoken");

function createToken(id, name) {
  const token = jwt.sign(
    {
      id: id,
      name: name,
    },
    process.env.JWT_SECRET
  );

  return token;
}
module.exports = createToken;
