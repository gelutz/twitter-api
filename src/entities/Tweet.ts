import { PrismaClient, tweets, likes, users } from "@prisma/client";
const prisma = new PrismaClient()

type TweetCreateParams = {
	login: users['login']
	text: tweets['text']
}

type LikeParams = {
	userId: users['id']
	tweetId: likes['tweetId']
}

type TTweet = {
	tweetId: string;
	user: string;
	text: string;
	likes: number;
	reweet?: TRetweet
}

type TRetweet = {
	tweetId: string
	user: string
	text?: string
	retweetId: string
}

export class Tweet {
	static async index(id: tweets['id']): Promise<tweets> {
		return new Promise((resolve, reject) => {
			prisma.tweets.findFirst({
				where: {
					id
				}
			}).then(resolve).catch(reject)
		})

	}
	static async retweet(userId: string, tweetId: string, text: string): Promise<tweets> {
		return new Promise((resolve, reject) => {
			prisma.tweets.create({
				data: {
					userId,
					text,
					retweetId: tweetId
				},
			}).then(resolve).catch(reject)
		})

	}

	static async showFeed(): Promise<TTweet[]> {
		const tweets = await prisma.tweets.findMany({
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
				retweet: {
					select: {
						id: true,
						userId: true,
						text: true,
						retweetId: true
					}
				}
			},
			orderBy: {
				createdAt: 'desc'
			}
		})

		const feedObject: TTweet[] = tweets.map((tweet) => {
			return {
				tweetId: tweet.id,
				user: tweet.user.login,
				text: tweet.text,
				likes: tweet._count.likes,
				retweet: tweet.retweet,
				// reweet: {
				// 	tweetId: tweet.retweet.id,
				// 	user: tweet.retweet.user.login,
				// 	text: tweet.retweet.text,
				// 	likes: tweet.retweet._count.likes,
				// }
			}
		})

		return feedObject
	}

	static async create({ login, text }: TweetCreateParams): Promise<tweets> {
		const user = await prisma.users.findFirst({
			where: { login },
			select: {
				id: true
			}
		})

		// não consegui pegar o erro com um try/catch
		// mas usando promises e o .catch consegui transformar em um erro comum
		return new Promise((resolve, reject) => {
			prisma.tweets.create({
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

	static async delete(tweetId: tweets['id']): Promise<tweets> {
		return await prisma.tweets.delete({
			where: {
				id: tweetId
			}
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

	static async seed(): Promise<boolean> {
		const users = await prisma.users.findMany({
			select: {
				id: true,
				login: true
			}
		})

		const tweets = users.map((user, index) => {
			return {
				userId: user.id,
				text: `Olá mundo ${index}`
			}
		})

		await prisma.tweets.createMany({
			data: tweets
		})

		return true
	}

}
