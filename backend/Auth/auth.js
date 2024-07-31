import { configDotenv } from "dotenv";
import jwt from "jsonwebtoken";

configDotenv();

function verifyToken(req, res, next) {
  try {
    const header = req.headers.authorization || '';
    console.log("this one:",header);
    const token = header.split(" ")[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if (!decoded) return res.status(401).json({ message: "user not verified" });
    req.user = decoded;
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: "Invalid token. Unauthorized access!" });
    }
    res.status(500).json({ message: "could not verify user. Internal server error!!" });
    console.log(error);
  }
}

function generateToken() {
  const testValue = { name: "this is a test value" };
  return jwt.sign(testValue, process.env.SECRET_KEY, { expiresIn: "30m" });
}

export { verifyToken, generateToken };
