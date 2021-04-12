import { RequestHandler } from 'express'
import { verify } from 'jsonwebtoken'
import createError from 'http-errors'

export const authJWT: RequestHandler = (req, res, next) => {

    let token 

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {

        token = req.headers.authorization.split(' ')[1]

        const decoded = verify(token, process.env.JWT_KEY as string)

        if (decoded) {
            return next()
        } else {
            next(createError(400, `Invalid token`))
        }

    } 

    if (!token) {
        return next(createError(401, "Unauthorized."))
    }

}