import {Router} from 'express'
import { AuthRouter } from './auth.route'

const routes = Router()
routes.use('/auth', AuthRouter)
// app.use("/login", authRouter)
// app.use("/user", userRouter)
// app.use("/role", roleRouter)

export { routes as Routes }
