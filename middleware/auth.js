// auth middleware

const jwt = require("jsonwebtoken");

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */

function verify(req, res, next) {
  const token = req.header("token");

  if (!token) {
    return res.status(401).json({ message: "you are not authorized" });
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET);

    const payload = jwt.decode(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}


module.exports = verify;