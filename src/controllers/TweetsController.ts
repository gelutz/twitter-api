import { PrismaClient } from "@prisma/client"
import { ok } from "assert"
import { Request, Response } from "express"
import { Tweet } from "../entities/Tweet"
import { User } from "../entities/User"

export class TweetsController {
	static async seed(_: Request, __: Response): Promise<boolean> {
		await Tweet.seed()

		return true
	}

	static async feed(req: Request, res: Response): Promise<Response> {
		const userId = req.params.login
		const feed = await Tweet.showFeed()
		return res.status(200).send({ message: 'ok', feed, userId })
	}

	static async create(req: Request, res: Response): Promise<Response> {
		try {
			const {
				login,
				text
			} = req.body

			await Tweet.create({ login, text })

		} catch (err) {
			return res.status(400).send({
				message: err.meta.message
			})
		}

		return res.status(201).send({ message: 'ok' })
	}

	static async likeOrDislike(req: Request, res: Response): Promise<Response> {
		try {
			const {
				login,
				tweetId
			} = req.body

			if (!Tweet.exists(tweetId)) {
				return res.status(404).send({ message: "Tweet não encontrado!" })
			}

			const prisma = new PrismaClient()

			const user = await User.getByLogin(login)

			const exists = await prisma.likes.findFirst({
				where: {
					userId: user.id,
					AND: {
						tweetId
					}
				}
			})

			if (exists)
				await Tweet.dislike(exists.id)
			else
				await Tweet.like({ userId: user.id, tweetId })

		} catch (err) {
			console.log(err)
			return res.status(400).send({ message: err })
		}

		return res.status(200).send({ message: 'ok' })
	}

	static async retweet(req: Request, res: Response): Promise<Response> {
		const {
			login,
			tweetId,
			text
		} = req.body

		if (!Tweet.exists(tweetId)) {
			return res.status(404).send({ message: "Tweet não encontrado!" })
		}

		const user = await User.getByLogin(login)
		const newTweet = Tweet.retweet(user.id, tweetId, text)

		return res.status(200).send({ message: ok, tweet: newTweet })
	}

	static async queryById(req: Request, res: Response): Promise<Response> {
		const tweetId = req.params.id

		const tweet = await Tweet.index(tweetId)

		if (!tweet) {
			return res.status(404).send({ message: 'Tweet não encontrado' })
		}

		return res.status(200).send({ message: 'ok', tweet })
	}

	static async delete(req: Request, res: Response): Promise<Response> {
		const { login, tweetId } = req.body

		if (!Tweet.exists(tweetId)) {
			return res.status(404).send({ message: "Tweet não encontrado!" })
		}

		const tweetUser = await Tweet.getTweetsUserLogin(tweetId)

		if (tweetUser != login) {
			return res.status(401).send({ message: "Você não é o autor do tweet" })
		}

		const deleted = await Tweet.delete(tweetId)

		if (!deleted) {
			return res.status(404).send({ message: 'Houve um erro ao tentar excluir o tweet' })
		}

		return res.status(200).send({ message: 'Tweet excluído.', })
	}
}

