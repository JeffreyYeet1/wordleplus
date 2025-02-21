"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes/auth.routes.ts
const express_1 = __importDefault(require("express"));
// Controller imports
const auth_controller_1 = require("../controllers/auth.controller");
const user_controller_1 = require("../controllers/user.controller");
const profile_controller_1 = require("../controllers/profile.controller");
const leaderboard_controller_1 = require("../controllers/leaderboard.controller");
// Middleware imports
const logging_middleware_1 = require("../middleware/logging.middleware");
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
const router = express_1.default.Router();
// Apply the logRequest middleware for all routes or specific routes
router.use(logging_middleware_1.logRequest); // This logs every request that hits this router
// Signup route
router.post('/signup', auth_controller_1.signup);
// Login route
router.post('/login', auth_controller_1.login);
// Profile route (protected)
router.get("/profile", auth_middleware_1.default, profile_controller_1.getProfile);
router.post("/user", auth_middleware_1.default, user_controller_1.postUser);
router.get('/validate-token', auth_middleware_1.default, (req, res) => {
    res.json({ message: 'Token is valid' });
});
router.get("/leaderboard", leaderboard_controller_1.getLeaderboard);
exports.default = router;
