import { RequestHandler } from 'express'
import { hash } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import createError from 'http-errors'

// Models
import User, { IschemaUser } from '../../models/user/user'

export const registerUser: RequestHandler = async (req, res, next) => {

    const saltRounds: number = 10
    const { firstName, lastName, username, email, password } = req.body as 
    {firstName: string, lastName: string, username: string, email: string, password: string}

    try {

        if (password.length <= 5) {
            return next(createError(400, 'Password must be 8 or more characters long'))
        }

        const existingEmail: IschemaUser | null = await User.findOne({email})

        if (existingEmail) {
            return next(createError(500, 'Email already exist, Please try again.'))
        }

        const hashedPassword = await hash(password, saltRounds)

        const createUser = new User({
            firstName,
            lastName,
            username,
            email,
            password: hashedPassword
        })

        await createUser.save()
        
        const token = sign({id: createUser._id }, process.env.JWT_KEY as string)

        return res.status(200).json({
            status: res.statusCode = 200,
            createdUser: createUser,
            token
        })

    } catch (err) {
        next(createError(400, 'Please try again.'))
    }

}