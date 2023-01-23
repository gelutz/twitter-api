import { Router } from 'express'
import { UsersController } from '../controllers/UsersController'

const routes = Router()

routes.post('/', UsersController.create)
routes.get('/', UsersController.all)
routes.get('/:login', UsersController.queryByLogin)
const userRouter = Router()
userRouter.use('/user', routes)

export { userRouter as UserRouter }
