import { Router } from 'express'
import { UsersController } from '../controllers/UsersController'

const routes = Router()

routes.post('/create', UsersController.create)
routes.get('/all', UsersController.all)
const userRouter = Router()
userRouter.use('/user', routes)

export { userRouter as UserRouter }
