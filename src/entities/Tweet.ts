import { PrismaClient, tweet, likes } from "@prisma/client";
const prisma = new PrismaClient()

type TweetCreateParams = Pick<tweet, "userId" | "text">

type LikeParams = Pick<likes, "userId" | "tweetId">

type FeedResponse = {
	tweetId: string;
	user: string;
	text: string;
	likes: number;
	order: number;
}[]
export class Tweet {
	static async create({ userId, text }: TweetCreateParams): Promise<tweet> {
		// não consegui pegar o erro com um try/catch
		// mas usando promises e o .catch consegui transformar em um erro comum
		return new Promise((resolve, reject) => {
			prisma.tweet.create({
				data: {
					userId: userId,
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
				userId,
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
