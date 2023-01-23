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
	static async retweet(userId: string, tweetId: string, text: string): Promise<tweet> {
		return new Promise((resolve, reject) => {
			prisma.tweet.create({
				data: {
					userId,
					text,
					retweetId: tweetId
				},
			}).then(resolve).catch(reject)
		})

	}

	static async showFeed(): Promise<TTweet[]> {
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

	static async delete(tweetId: tweet['id']): Promise<tweet> {
		return await prisma.tweet.delete({
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
		const users = await prisma.user.findMany({
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

		await prisma.tweet.createMany({
			data: tweets
		})

		return true
	}
}
