import { Router } from 'express'
import { TweetsController } from '../controllers/TweetsController'

const routes = Router()
routes.use('/tweet',
	Router()
		.post('/create', TweetsController.create)
		.post('/sendLike', TweetsController.likeOrDislike)
)

export { routes as TweetRouter }
