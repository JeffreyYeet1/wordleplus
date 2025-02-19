"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logRequest = void 0;
const logRequest = (req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    console.log("Logging middleware hit");
    next(); // Proceed to the next middleware or route handler
};
exports.logRequest = logRequest;
