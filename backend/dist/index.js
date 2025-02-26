"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path")); // Import the path module
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5001;
const FRONTEND_APP_URL = process.env.FRONTEND_APP_URL || 'http://localhost:3000';
// Middleware
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        // Allow requests with or without a trailing slash
        if (!origin || origin.replace(/\/$/, '') === FRONTEND_APP_URL.replace(/\/$/, '')) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true, // Allow cookies and headers
}));
app.use(express_1.default.json()); // For JSON data
app.use(express_1.default.urlencoded({ extended: true })); // For form data
// Serve static files from the frontend build directory
app.use(express_1.default.static(path_1.default.join(__dirname, "../../frontend/build")));
// Connect to MongoDB Atlas
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
    console.error('MONGO_URI is not defined in the environment variables.');
    process.exit(1);
}
mongoose_1.default
    .connect(MONGO_URI)
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch((err) => console.error('MongoDB connection error:', err));
// Logging middleware
app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    next();
});
// Backend homepage
app.get('/', (req, res) => {
    res.send("Hello from the backend");
});
// Test route
app.get('/test', (req, res) => {
    console.log('Test route hit');
    res.send('Server is working!');
});
// Mount auth routes
app.use('/api/auth', auth_routes_1.default);
// Serve the frontend's index.html for all other routes
app.get('*', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "../../frontend/build/index.html"));
});
// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
