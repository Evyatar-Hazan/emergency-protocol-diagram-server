"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
require("dotenv/config");
const config_1 = require("./config");
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const commentRoutes_1 = __importDefault(require("./routes/commentRoutes"));
const app = (0, express_1.default)();
// Middleware
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)(config_1.config.cors));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Routes
app.use('/api/auth', authRoutes_1.default);
app.use('/api/comments', commentRoutes_1.default);
// Health check
app.get('/health', (_req, res) => {
    res.json({ status: 'ok' });
});
// Error handling middleware
app.use((err, _req, res, _next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({
        message: 'Internal server error',
        ...(config_1.config.nodeEnv === 'development' && { error: err.message }),
    });
});
// 404 handler
app.use((_req, res) => {
    res.status(404).json({ message: 'Route not found' });
});
exports.default = app;
//# sourceMappingURL=index.js.map