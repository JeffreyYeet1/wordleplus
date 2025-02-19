import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Define a custom Request type that includes `user`
interface AuthenticatedRequest extends Request {
  user?: { id: string; username: string; email: string }; // Customize as needed
}

interface DecodedToken {
    id: string;
    username: string;
    email: string;
  }

const verifyToken = (token: string): DecodedToken=> {
try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;
    return decoded; // Token is valid, return the decoded data
} catch (error) {
    console.error('JWT verification failed:', error);
    return {
        id: "",
        username: "",
        email: "",
    }; // Return null if token is invalid
}
};

const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    console.log("Access Denied: No token provided");
    res.status(401).json({ message: "Access Denied: No token provided" }); // Return to stop further execution
    return;
  }

  try {
    const decoded = verifyToken(token);
    console.log(decoded);
    req.user = decoded; // Attach the decoded token to req.user
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.log("Invalid or expired token:", error);
    res.status(403).json({ message: "Invalid or expired token" }); // Return to stop further execution
    return;
  }
};

export default authenticateToken;