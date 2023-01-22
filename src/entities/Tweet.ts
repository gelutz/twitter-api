import { PrismaClient, tweet, likes, user } from "@prisma/client";
const prisma = new PrismaClient()

type TweetCreateParams = {
	login: user['login']
	text: tweet['text']
}

type LikeParams = {
	userId: user['id']
	tweetId: likes['tweetId']
}

type FeedResponse = {
	tweetId: string;
	user: string;
	text: string;
	likes: number;
	order: number;
}[]

export class Tweet {
	static async seed(): Promise<boolean> {
		const users = await prisma.user.findMany({
			select: {
				login: true
			}
		})

		const tweets = users.map((user, index) => {
			return {
				login: user.login,
				text: `Olá mundo ${index}`
			}
		})

		await prisma.tweet.createMany({
			data: tweets
		})

		return true
	}

	static async create({ login, text }: TweetCreateParams): Promise<tweet> {
		const user = await prisma.user.findFirst({
			where: { login },
			select: {
				id: true
			}
		})

		// não consegui pegar o erro com um try/catch
		// mas usando promises e o .catch consegui transformar em um erro comum
		return new Promise((resolve, reject) => {
			prisma.tweet.create({
				data: {
					userId: user.id,
					text: text
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

	static async like({ userId, tweetId }: LikeParams): Promise<likes> {

		return await prisma.likes.create({
			data: {
				userId: userId,
				tweetId
			}
		})
	}

	static async dislike(id: likes['id']): Promise<likes> {
		return await prisma.likes.delete({
			where: {
				id
			}
		})
	}

	static async showFeed(): Promise<FeedResponse> {
		const tweets = await prisma.tweet.findMany({
			include: {
				_count: {
					select: {
						likes: true
					}
				},
				user: {
					select: {
						login: true
					}
				},
			}
		})

		const feedObject = tweets.map((tweet, index) => {
			return {
				tweetId: tweet.id,
				user: tweet.user.login,
				text: tweet.text,
				likes: tweet._count.likes,
				order: index
			}
		})

		return feedObject
	}
}
