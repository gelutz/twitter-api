import { Request, Response, NextFunction } from "express";

export const xPowered = (_: Request, res: Response, next: NextFunction): void => {
    next();
    res.set({
        "X-Powered-By": "Lutz",
    });
};
