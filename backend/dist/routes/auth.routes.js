"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes/auth.routes.ts
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth.controller");
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
router.get("/profile", auth_middleware_1.default, auth_controller_1.getProfile);
// Logout route (send the response directly from the controller)
// router.post('/logout', logout);
exports.default = router;
