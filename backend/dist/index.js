"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5001;
// Middleware
app.use(express_1.default.json());
// Connect to MongoDB
mongoose_1.default.connect(process.env.MONGO_URI, {
    dbName: 'wordleplus',
})
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));
// Routes
app.get('/', (req, res) => {
    res.send('Hello from the backend!');
});
// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
