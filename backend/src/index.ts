import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import cors from 'cors';
import path from 'path'; // Import the path module

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const FRONTEND_APP_URL = process.env.FRONTEND_APP_URL || 'http://localhost:3000';

// Middleware
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with or without a trailing slash
    if (!origin || origin.replace(/\/$/, '') === FRONTEND_APP_URL.replace(/\/$/, '')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Allow cookies and headers
}));
app.use(express.json()); // For JSON data
app.use(express.urlencoded({ extended: true })); // For form data

// Serve static files from the frontend build directory
app.use(express.static(path.join(__dirname, "../../frontend/build")));

// Connect to MongoDB Atlas
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  console.error('MONGO_URI is not defined in the environment variables.');
  process.exit(1);
}

mongoose
  .connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Logging middleware
app.use((req: Request, res: Response, next: Function) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

// Backend homepage
app.get('/', (req: Request, res: Response) => {
  res.send("Hello from the backend");
});

// Test route
app.get('/test', (req: Request, res: Response) => {
  console.log('Test route hit');
  res.send('Server is working!');
});

// Mount auth routes
app.use('/api/auth', authRoutes);

// Serve the frontend's index.html for all other routes
app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../../frontend/build/index.html"));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});