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
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5001;
const FRONTEND_APP_URL = process.env.FRONTEND_APP_URL;
// Middleware
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        const allowedOrigins = ['http://localhost:3000', FRONTEND_APP_URL];
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
}));
app.use(express_1.default.json()); // For JSON data
app.use(express_1.default.urlencoded({ extended: true })); // For form data
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
mongoose_1.default.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});
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
// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
