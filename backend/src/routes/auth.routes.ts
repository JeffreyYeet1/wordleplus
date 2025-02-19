// routes/auth.routes.ts
import express from 'express';
import { getProfile, signup, login } from '../controllers/auth.controller';
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

// Logout route (send the response directly from the controller)
// router.post('/logout', logout);

export default router;
