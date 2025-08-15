const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/jwt");

const authMiddleware = {
  protect: (req, res, next) => {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.token) {
      token = req.cookies.token;
    }

    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    try {
      const decoded = jwt.verify(token, jwtSecret);
      req.user = { id: decoded.id };
      next();
    } catch (error) {
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  },
};

module.exports = authMiddleware;
