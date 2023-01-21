
import { Request, Response, NextFunction } from "express";
// import jwt, { JsonWebTokenError } from "jsonwebtoken";
// import UnauthorizedError from "../errors/UnauthorizedError";
// import TokenExpiredError from "../errors/TokenExpired";

export function bearerAuth(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    if (!authorization) {
        throw new UnauthorizedError();
    }

    const token = authorization.replace("Bearer ", "");
    try {
        jwt.verify(token, process.env.JWT_KEY!);
    } catch (err) {
        if (err instanceof JsonWebTokenError) {
            if (err.message === "Token expirado") {
                throw new TokenExpiredError("access");
            }
            // TODO adicionar tratação de erro de token que não é válido
        }
    }

    next();
}

export function optionalAuth(req: Request, res: Response, next: NextFunction) {
    if (req.headers.authorization) {
        bearerAuth(req, res, next);
    } else {
        next();
    }
}
