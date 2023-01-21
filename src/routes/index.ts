import {Router} from 'express'
import { AuthRouter } from './auth.route'
import { UserRouter } from './user.route'

const routes = Router()
routes.use(AuthRouter)
routes.use(UserRouter)

// app.use("/login", authRouter)
export { routes as Routes }
