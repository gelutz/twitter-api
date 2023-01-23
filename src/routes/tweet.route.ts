import { Router } from 'express'
import { TweetsController } from '../controllers/TweetsController'
import { bearerAuth } from '../middlewares/BearerAuth'
import { checkLogin } from '../middlewares/CheckLogin'

const routes = Router()

routes.post('/', TweetsController.create)
routes.get('/:id', TweetsController.index)
routes.delete('/:id', TweetsController.delete)
routes.post('/sendLike', TweetsController.likeOrDislike)
routes.post('/retweet', TweetsController.retweet)

const tweetRouter = Router()
tweetRouter.use('/tweet', [bearerAuth, checkLogin], routes)

export { tweetRouter as TweetRouter }
