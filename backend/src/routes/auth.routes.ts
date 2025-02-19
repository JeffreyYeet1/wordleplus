// routes/auth.routes.ts
import express from 'express';
import { signup, login } from '../controllers/auth.controller';

const router = express.Router();

// Signup route
router.post('/signup', (req, res, next) => {
    console.log('Signup route hit'); // Add this line
    next();
  }, signup);

// Login route
router.post('/login', (req, res, next) => {
    console.log('Login route hit'); // Add this line
    next();
  }, login);


export default router;