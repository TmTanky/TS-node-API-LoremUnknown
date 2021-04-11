import { RequestHandler } from 'express'
import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import createError from 'http-errors'

// Models
import User, { IschemaUser } from '../../models/user/user'

export const loginUser: RequestHandler = async (req, res, next) => {

    try {

        const {email, password} = req.body as {email: string, password: string}

        const foundUser: IschemaUser | null = await User.findOne({email})

        if (foundUser) {

            const result = await compare(password, foundUser.password)

            if (result) {

                const token = sign({id: foundUser._id}, process.env.JWT_KEY as string)

                res.status(200).json({
                    status: res.statusCode = 200,
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
        next(createError(400, 'Please try again.'))
    }

}