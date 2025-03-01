import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import cors from 'cors';
import path from 'path';
import fs from 'fs';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const FRONTEND_APP_URL = process.env.FRONTEND_APP_URL;

// Path to the frontend build folder (mounted in Docker)
const buildPath = path.join('/app/frontend-build');
console.log('Path to build folder:', buildPath);

// Verify the build folder exists
if (!fs.existsSync(buildPath)) {
  console.error(`The directory ${buildPath} does not exist.`);
  process.exit(1); // Exit the process if the directory is missing
}

// Middleware
app.use(cors({
  // Enable CORS for both production and local development
  origin: (origin, callback) => {
    const allowedOrigins = ['http://localhost:3000', FRONTEND_APP_URL];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));
app.use(express.json()); // For JSON data
app.use(express.urlencoded({ extended: true })); // For form data
app.use(express.static(buildPath)); // Serve static files from the React app

// Connect to MongoDB Atlas
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  console.error('MONGO_URI is not defined in the environment variables.');
  process.exit(1);
}

// Connect to MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Test connection
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

// Logging middleware
app.use((req: Request, res: Response, next: Function) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

// Backend homepage
app.get('/', (req: Request, res: Response) => {
  res.send(`
    Hello from the backend!<br>
    Build path: ${buildPath}<br>
    Does build folder exist? ${fs.existsSync(buildPath)}<br>
    Directory of current file (__dirname): ${__dirname}<br>
    Current working directory (process.cwd()): ${process.cwd()}
  `);
});

// Test route
app.get('/test', (req: Request, res: Response) => {
  console.log('Test route hit');
  res.send('Server is working!');
});

// Mount auth routes
app.use('/api/auth', authRoutes);

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
  const indexPath = path.join(buildPath, 'index.html');
  console.log('Serving index.html from:', indexPath);
  res.sendFile(indexPath);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});