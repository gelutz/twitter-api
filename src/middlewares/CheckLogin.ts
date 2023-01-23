import { NextFunction, Request, Response } from "express";
import { decode } from 'jsonwebtoken'

export function checkLogin(req: Request, res: Response, next: NextFunction): Response | void {
	const { authorization } = req.headers

	let login
	if (req.params.login) {
		login = req.params.login
	} else {
		login = req.body.login
	}

	const token = authorization.replaceAll("Bearer ", "")
	const decoded = decode(token, { complete: true })

	if (!decoded) {
		return res.status(401).send({ message: "Há um problema com o seu token ou seu login" })
	}

	if (decoded.payload['login'] != login) {
		return res.status(401).send({ message: "Você não é esse usuário" })
	}

	next()
}
