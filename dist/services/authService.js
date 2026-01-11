"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginOrCreateUser = exports.verifyGoogleToken = void 0;
const google_auth_library_1 = require("google-auth-library");
const config_1 = require("../config");
const client_1 = require("@prisma/client");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma = new client_1.PrismaClient();
const googleClient = new google_auth_library_1.OAuth2Client({
    clientId: config_1.config.google.clientId,
    clientSecret: config_1.config.google.clientSecret,
    redirectUri: config_1.config.google.callbackUrl,
});
const verifyGoogleToken = async (idToken) => {
    try {
        const ticket = await googleClient.verifyIdToken({
            idToken,
            audience: config_1.config.google.clientId,
        });
        const payload = ticket.getPayload();
        return payload;
    }
    catch (error) {
        console.error('Google token verification failed:', error);
        return null;
    }
};
exports.verifyGoogleToken = verifyGoogleToken;
const loginOrCreateUser = async (payload) => {
    const isAdmin = payload.email === config_1.config.adminEmail;
    let user = await prisma.user.findUnique({
        where: { email: payload.email },
    });
    if (!user) {
        user = await prisma.user.create({
            data: {
                email: payload.email,
                googleId: payload.sub,
                name: payload.name,
                picture: payload.picture,
                isAdmin,
            },
        });
    }
    else if (user.isAdmin !== isAdmin) {
        // Update admin status if needed
        user = await prisma.user.update({
            where: { id: user.id },
            data: { isAdmin },
        });
    }
    const token = jsonwebtoken_1.default.sign({
        id: user.id,
        email: user.email,
        isAdmin: user.isAdmin,
    }, config_1.config.jwt.secret, { expiresIn: config_1.config.jwt.expiresIn });
    return { user, token };
};
exports.loginOrCreateUser = loginOrCreateUser;
//# sourceMappingURL=authService.js.map