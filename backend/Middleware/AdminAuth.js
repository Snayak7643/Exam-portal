const jwt = require("jsonwebtoken");

const AdminAuth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(402).json({ err: "You are not Logged In!!" });
  }
  const token = authorization.replace("Bearer", "");

  jwt.verify(token, process.env.JWT_SECRET_ADMIN, (err, decode) => {
    if (err) {
      return res.status(402).json({ err });
    }
    req.data = decode.id;
    next();
  });
};

module.exports = AdminAuth;
