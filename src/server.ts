import express from 'express'
import cors from 'cors'
import 'dotenv/config'

import { Routes } from './routes'
import { xPowered } from './middlewares/xpowered'

const app = express()
const port = process.env.API_PORT

app.use(cors())
app.use(xPowered)
app.use(express.json())
app.use(Routes)

app.listen(port, () => console.log(`Server ouvindo na porta ${port}`))
