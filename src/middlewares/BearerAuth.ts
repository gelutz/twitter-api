
import { Request, Response, NextFunction } from "express";
import jwt, { JsonWebTokenError } from "jsonwebtoken";

export function bearerAuth(req: Request, res: Response, next: NextFunction): Response | void {
	const { authorization } = req.headers;

	if (typeof authorization != "string") {
		return res.status(401).send({ message: "Não está autorizado" })
	}

	const token = authorization.replace("Bearer ", "")

	if (token === "") {
		return res.status(401).send({ message: "Não está autorizado" })
	}

	try {
		jwt.verify(token, process.env.JWT_KEY);
	} catch (err) {
		if (err instanceof JsonWebTokenError) {
			if (err.message === "Token expirado") {
				return res.status(401).send({ message: "O token está expirado. Favor refazer o login." })
			}
		}
	}

	next();
}

export function optionalAuth(req: Request, res: Response, next: NextFunction): void {
	if (req.headers.authorization) {
		bearerAuth(req, res, next);
	} else {
		next();
	}
}
