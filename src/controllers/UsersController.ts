import { Request, Response } from "express"
import { Controller } from "../@types/Controller"

class UsersController implements Controller {
	async create(req: Request, res: Response): Promise<Response> {
		const data = req.body

		console.log(data)

		return res.status(200).send({message: 'ok', data})
	}
}

export {UsersController}
