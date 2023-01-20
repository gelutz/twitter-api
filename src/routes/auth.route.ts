import {Router} from 'express'

const routes = Router()
const testController = (): number => 1

routes.post('/login', testController)
routes.post('/validate', testController)

export { routes as AuthRouter }
