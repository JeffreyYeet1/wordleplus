import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface User {
  id: String;
  username: String;
  email: String;
}
// Define a custom Request type that includes `user`
interface AuthenticatedRequest extends Request {
  user?: User; // Customize as needed
}

const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    console.log("Access Denied: No token provided");
    res.status(401).json({ message: "Access Denied: No token provided" }); // Return to stop further execution
    return;
  }

  try {
    const JWT_SECRET = process.env.JWT_SECRET;

    // Ensure JWT_SECRET is defined
    if (!JWT_SECRET) {
      console.log(res.status(500).json({ error: 'JWT secret is not configured' }));
      return;
    }
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ error: 'Forbidden: Invalid token' });
      }
      req.user = user as User; // Attach the user to the request object
      next();
    });
  } catch (error) {
    console.log("Invalid or expired token:", error);
    res.status(403).json({ message: "Invalid or expired token" }); // Return to stop further execution
    return;
  }
};

export default authenticateToken;