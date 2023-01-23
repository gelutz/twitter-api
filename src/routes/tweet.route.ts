import { Router } from 'express'
import { TweetsController } from '../controllers/TweetsController'
import { bearerAuth } from '../middlewares/Auth'

const routes = Router()

routes.post('/create', TweetsController.create)
routes.post('/sendLike', TweetsController.likeOrDislike)

const tweetRouter = Router()
tweetRouter.use('/tweet', bearerAuth, routes)

export { tweetRouter as TweetRouter }
