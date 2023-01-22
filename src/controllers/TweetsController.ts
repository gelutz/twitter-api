import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"
import { Tweet } from "../entities/Tweet"

export class TweetsController {

	static async feed(req: Request, res: Response): Promise<Response> {
		const userId = req.params.login
		const feed = await Tweet.showFeed()
		return res.status(200).send({ message: 'ok', feed, userId })
	}

	static async create(req: Request, res: Response): Promise<Response> {
		try {
			const {
				userId,
				text
			} = req.body

			await Tweet.create({ userId, text })

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

	static async likeOrDislike(req: Request, res: Response): Promise<Response> {
		try {
			const {
				userId,
				tweetId
			} = req.body

			const prisma = new PrismaClient()
			const exists = await prisma.likes.findFirst({
				where: {
					userId,
					AND: {
						tweetId
					}
				}
			})

			if (exists)
				await Tweet.dislike(exists.id)
			else
				await Tweet.like({ userId, tweetId })

		} catch (err) {
			if (err instanceof Error) {
				return res.status(400).send({
					message: err.message
				})
			}
		}

		return res.status(200).send({ message: 'ok' })
	}
}

