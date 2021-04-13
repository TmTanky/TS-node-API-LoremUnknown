require('dotenv').config()
import express, { Request, Response, NextFunction, RequestHandler } from 'express'
import mongoose from 'mongoose'
import cookieSession from 'cookie-session'
import createError from 'http-errors'

const app = express()
const PORT = process.env.PORT || 3000

// Routes
import RegisterRouter from './routes/register/register'
import LoginRouter from './routes/login/login'
import CreatePostRouter from './routes/post/createPost/createPost'
import DeletePostRouter from './routes/post/deletePost/deletePost'
import UpdatePostRouter from './routes/post/updatePost/updatePost'
import ReactsPostRouter from './routes/post/reactsPost/reactsPost'
import CommentsRouter from './routes/post/commentPost/commentPost'
import DeleteCommentRouter from './routes/post/commentPost/deleteCommentPost'
import UpdateCommentRouter from './routes/post/commentPost/updateCommenPost'

mongoose.connect(`mongodb+srv://TmAdmin:${process.env.MONGO_PASS}@cluster0.c7khy.mongodb.net/TS-api-unknownlorem?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieSession({
    name: 'session',
    keys: [process.env.KEY_1 as string, process.env.KEY_2 as string]
}))

app.use(RegisterRouter)
app.use(LoginRouter)
app.use(CreatePostRouter)
app.use(DeletePostRouter)
app.use(UpdatePostRouter)
app.use(ReactsPostRouter)
app.use(CommentsRouter)
app.use(DeleteCommentRouter)
app.use(UpdateCommentRouter)

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
