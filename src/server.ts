// import "express-async-errors"
import express from 'express'
import cors from 'cors'
import 'dotenv/config'

import { Routes } from './routes'

const app = express()
const port = process.env.API_PORT

app.use(cors())
app.use(express.json())
app.use(Routes)
// app.use(xPowered)

app.listen(port, () => console.log(`Server ouvindo na porta ${port}`))
