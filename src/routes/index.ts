import { Router } from 'express'
import { TweetsController } from '../controllers/TweetsController'
import { AuthRouter } from './auth.route'
import { TweetRouter } from './tweet.route'
import { UserRouter } from './user.route'

const routes = Router()
routes.use(AuthRouter)
routes.use(UserRouter)
routes.use(TweetRouter)

routes.get('/feed/:login', TweetsController.feed)

export { routes as Routes }
