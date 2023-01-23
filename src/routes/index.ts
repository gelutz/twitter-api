import { Router } from 'express'
import swaggerUi from 'swagger-ui-express'

import { SwaggerConfig } from '../config/swagger'
import { TweetsController } from '../controllers/TweetsController'
import { UsersController } from '../controllers/UsersController'
import { bearerAuth } from '../middlewares/BearerAuth'
import { checkLogin } from '../middlewares/CheckLogin'
import { AuthRouter } from './auth.route'
import { TweetRouter } from './tweet.route'
import { UserRouter } from './user.route'

const routes = Router()
routes.use(AuthRouter)
routes.use(UserRouter)
routes.use(TweetRouter)
routes.get('/feed/:login', [bearerAuth, checkLogin], TweetsController.feed)

// rota usada para criar os primeiros registros no banco após inicialização
routes.get('/seed', (req, res) => {
	UsersController.seed(req, res)
	TweetsController.seed(req, res)
})

// rota do swagger
routes.use('/api/docs', swaggerUi.serve, swaggerUi.setup(SwaggerConfig))

export { routes as Routes }
