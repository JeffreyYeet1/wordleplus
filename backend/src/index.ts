import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(express.json()); // For JSON data
app.use(express.urlencoded({ extended: true })); // For form data

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

// Serve the signup form
app.get('/', (req: Request, res: Response) => {
  res.send("Hello from the backend!");
});

// Test route
app.get('/test', (req: Request, res: Response) => {
  console.log('Test route hit');
  res.send('Server is working!');
});

// Mount auth routes
app.use('/api/auth', authRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});