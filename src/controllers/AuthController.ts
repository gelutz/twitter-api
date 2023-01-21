import { Request, Response } from "express";
import { User } from "../entities/User";
import bcrypt from 'bcrypt'
import { getAccessToken } from "../utils/Token";

export class AuthController {
	static async login(req: Request, res: Response): Promise<Response> {
		const {login, password} = req.body

		const user = await User.getByLogin(login)

		if (!user) {
			return res.status(404).send({ message: "User not found" });
		}

		const isValidPassword = await bcrypt.compare(password, user.password);

		if (!isValidPassword) {
            return res.status(404).send({ message: "Unvalid password" });
        }

		const accessToken = await getAccessToken({ login });

        res.set("Authorization", accessToken);
		return res.status(200).send({ accessToken, login })
	}

}
