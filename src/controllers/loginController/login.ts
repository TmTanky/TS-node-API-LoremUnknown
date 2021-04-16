import e, { RequestHandler } from 'express'
import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import session from 'cookie-session'
import createError from 'http-errors'

// Models
import User, { IschemaUser } from '../../models/user/user'

export const loginUser: RequestHandler = async (req, res, next) => {

    try {

        const {email, password} = req.body as {email: string, password: string}
        const foundUser: IschemaUser | null = await User.findOne({email})

        if (email === "" || password === "") {
            return next(createError(400, `Inputs can't be empty.`))
        }

        if (foundUser) {

            const result = await compare(password, foundUser.password)

            if (result) {

                const token = sign({id: foundUser._id}, process.env.JWT_KEY as string)

                req.session!.userID = foundUser._id
                console.log(req.session!.userID = foundUser._id)
                return res.status(200).json({
                    status: 200,
                    loggedInUser: foundUser,
                    token
                })

            } else {
                next(createError(400, 'Invalid Email or Password.'))
            }

        } else {
            next(createError(400, 'User does not exist.'))
        }
        
    } catch (err) {
        next(createError(500, 'Please try again.'))
    }

}

export const logoutUser: RequestHandler = (req, res, next) => {
    req.session = null
}