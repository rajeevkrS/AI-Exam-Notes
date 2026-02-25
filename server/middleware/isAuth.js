import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
  try {
    // getting the token from cookies
    let { token } = req.cookies;

    if (!token) {
      res.status(400).json({ message: "Token is not found!" });
    }

    // verifying the token
    let verifyToken = jwt.verify(token, process.env.JWT_SECRET);

    if (!verifyToken) {
      res.status(400).json({ message: "User does not have valid token!" });
    }

    // finding user id from verified token
    req.userId = verifyToken.userId;

    next();
  } catch (error) {
    res.status(500).json({ message: `is Auth error: ${error}` });
  }
};

export default isAuth;
