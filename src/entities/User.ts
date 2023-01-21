import bcrypt from 'bcrypt'
import { PrismaClient, user } from '@prisma/client'
import { verifyEmail } from '../utils/EmailVerifier'
const prisma = new PrismaClient()

export class User {
	static async create(data: Omit<user, "id">): Promise<user> {
		return new Promise((resolve, reject) => {
			const {
				name,
				login,
				password,
				email
			} = data

			if (!verifyEmail(email)) {
				throw Error("Invalid email.")
			}
			const hash = bcrypt.hashSync(password, 8)
			prisma.user.create({
				data: {
					name,
					login,
					email,
					password: hash
				}
			}).then((value) => {
				resolve(value)
			}).catch((error) => {
				console.error(error)
				reject(new
					Error(`Houve um erro ao cadastrar usuário com esse ${error.meta.target}`)
				)
			})
		})
	}

	static async getByLogin(login: string): Promise<user> {
		return await prisma.user.findFirst({
			where: {
				login
			}
		})
	}

	// static async index(id: string): Promise<user> {
	// 	return
	// }

	// static async update(id: string, data: user): Promise<boolean> {
	// 	return
	// }

	// static async delete(id: string): Promise<boolean> {
	// 	return
	// }
}
