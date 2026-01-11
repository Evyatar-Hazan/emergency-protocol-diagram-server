export interface GoogleTokenPayload {
    iss: string;
    azp: string;
    aud: string;
    sub: string;
    email: string;
    email_verified: boolean;
    at_hash: string;
    name: string;
    picture: string;
    given_name: string;
    family_name: string;
    locale: string;
    iat: number;
    exp: number;
}
export declare const verifyGoogleToken: (idToken: string) => Promise<GoogleTokenPayload | null>;
export declare const loginOrCreateUser: (payload: GoogleTokenPayload) => Promise<{
    user: {
        id: string;
        email: string;
        googleId: string;
        name: string | null;
        picture: string | null;
        isAdmin: boolean;
        createdAt: Date;
        updatedAt: Date;
    };
    token: string;
}>;
//# sourceMappingURL=authService.d.ts.map