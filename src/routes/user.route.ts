import {Router} from 'express'
import {UsersController} from '../controllers/UsersController'

const routes = Router()
routes.use('/user',
	Router()
		.post('/create', 	UsersController.create)
		// .get('/index', 		UsersController.index)
	)

export { routes as UserRouter }
