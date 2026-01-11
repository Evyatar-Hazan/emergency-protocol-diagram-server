import 'dotenv/config';
export declare const config: {
    port: number;
    nodeEnv: string;
    databaseUrl: string;
    frontendUrl: string;
    adminEmail: string;
    google: {
        clientId: string;
        clientSecret: string;
        callbackUrl: string;
    };
    jwt: {
        secret: string;
        expiresIn: string;
    };
    cors: {
        origin: string;
        credentials: boolean;
    };
};
//# sourceMappingURL=index.d.ts.map