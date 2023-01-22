import { Router } from 'express'
import { TweetsController } from '../controllers/TweetsController'
import { UsersController } from '../controllers/UsersController'
import { AuthRouter } from './auth.route'
import { TweetRouter } from './tweet.route'
import { UserRouter } from './user.route'

const routes = Router()
routes.use(AuthRouter)
routes.use(UserRouter)
routes.use(TweetRouter)

routes.get('/feed/:login', TweetsController.feed)
routes.get('/seed', (req, res) => {
	UsersController.seed(req, res)
	TweetsController.seed(req, res)
})

export { routes as Routes }
