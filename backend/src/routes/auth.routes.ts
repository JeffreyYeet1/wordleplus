// routes/auth.routes.ts
import express from 'express';

// Controller imports
import { signup, login } from '../controllers/auth.controller';
import { postUser } from '../controllers/user.controller';
import { getProfile } from '../controllers/profile.controller';

// Middleware imports
import { logRequest } from '../middleware/logging.middleware';
import authenticateToken from '../middleware/auth.middleware';

const router = express.Router();

// Apply the logRequest middleware for all routes or specific routes
router.use(logRequest); // This logs every request that hits this router

// Signup route
router.post('/signup', signup);

// Login route
router.post('/login', login);

// Profile route (protected)
router.get("/profile", authenticateToken, getProfile);

router.post("/user", authenticateToken, postUser);

router.get('/validate-token', authenticateToken, (req, res) => {
    res.json({ message: 'Token is valid' });
  });

export default router;
