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

	static async findAll(): Promise<user[]> {
		return await prisma.user.findMany()
	}

	static async getByLogin(login: string): Promise<user> {
		return await prisma.user.findFirstOrThrow({
			where: { login }
		})

	}

	static async seed(): Promise<boolean> {

		const hash = bcrypt.hashSync("123", 8)
		await prisma.user.createMany({
			data: [
				{
					name: "User #1",
					login: "user-1",
					email: "user1@gmail.com",
					password: hash
				},
				{
					name: "User #2",
					login: "user-2",
					email: "user2@gmail.com",
					password: hash
				},
				{
					name: "User #3",
					login: "user-3",
					email: "user3@gmail.com",
					password: hash
				},
				{
					name: "User #4",
					login: "user-4",
					email: "user4@gmail.com",
					password: hash
				}
			]
		})

		return true
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
