import { Request, Response } from "express"
import { User } from "../entities/User"

export class UsersController {
	static async create(req: Request, res: Response): Promise<Response> {
		try {
			await User.create(req.body)
		} catch (err) {
			if (err instanceof Error) {
				return res.status(400).send({
					message: err.message
				})
			}
		}

		// return res.status(200).send({message: 'ok', newUserId})
		return res.status(200).send({ message: 'ok' })
	}
}

