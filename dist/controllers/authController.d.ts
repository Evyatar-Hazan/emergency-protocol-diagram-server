import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
export declare const googleLogin: (req: AuthRequest, res: Response) => Promise<void>;
export declare const getCurrentUser: (req: AuthRequest, res: Response) => Promise<void>;
//# sourceMappingURL=authController.d.ts.map