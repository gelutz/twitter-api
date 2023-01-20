import {Router} from 'express'
import UsersController from '../controllers/UsersController'

const routes = Router()

routes.post('/create', UsersController.create)
routes.post('/validate', testController)

export { routes as AuthRouter }
