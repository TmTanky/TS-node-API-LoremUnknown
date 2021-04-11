require('dotenv').config()
import express, { Request, Response, NextFunction } from 'express'
import mongoose from 'mongoose'
import createError from 'http-errors'

const app = express()
const PORT = process.env.PORT || 3000

// Routes
import RegisterRouter from './routes/register/register'
import LoginRouter from './routes/login/login'

mongoose.connect(`mongodb+srv://TmAdmin:${process.env.MONGO_PASS}@cluster0.c7khy.mongodb.net/TS-api-unknownlorem?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(RegisterRouter)
app.use(LoginRouter)

app.use((req: Request, res: Response, next: NextFunction) => {
    next(createError(404, `Not found`))
})

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    req.statusCode = 500 || req.statusCode
    return res.status(req.statusCode).json({
        status: req.statusCode,
        msg: err.message,
        err
    })
})


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
