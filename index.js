import express from 'express'
import { globalError } from './src/middleware/globalError.js'
import { AppError } from './src/utils/appError.js'
import { bootstrap } from './src/modules/bootstrap.js'

import { dbConn } from './database/db_Connecion.js'
import cors from 'cors'
import 'dotenv/config'


const app = express()
const port = 3000
app.use(express.json())
bootstrap(app)
app.use('*', (req, res, next) => {
    next(new AppError(`route not found ${req.originalUrl}`, 404))
})

app.use(globalError)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))