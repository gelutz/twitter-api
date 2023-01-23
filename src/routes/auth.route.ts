import { Router } from 'express'
import { AuthController } from '../controllers/AuthController'

const routes = Router()
/**
 * @openapi
 * /:
 *   get:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
routes.post('/login', AuthController.login)

export { routes as AuthRouter }
