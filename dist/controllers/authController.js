"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentUser = exports.googleLogin = void 0;
const authService_1 = require("../services/authService");
const googleLogin = async (req, res) => {
    try {
        const { idToken } = req.body;
        if (!idToken) {
            res.status(400).json({ message: 'ID token required' });
            return;
        }
        const payload = await (0, authService_1.verifyGoogleToken)(idToken);
        if (!payload) {
            res.status(401).json({ message: 'Invalid token' });
            return;
        }
        const { user, token } = await (0, authService_1.loginOrCreateUser)(payload);
        res.json({
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                picture: user.picture,
                isAdmin: user.isAdmin,
            },
        });
    }
    catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Login failed' });
    }
};
exports.googleLogin = googleLogin;
const getCurrentUser = async (req, res) => {
    res.json({
        user: {
            id: req.user?.id,
            email: req.user?.email,
            isAdmin: req.user?.isAdmin,
        },
    });
};
exports.getCurrentUser = getCurrentUser;
//# sourceMappingURL=authController.js.map