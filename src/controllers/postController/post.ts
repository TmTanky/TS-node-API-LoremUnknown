import { RequestHandler } from 'express'
import createError from 'http-errors'
import { isValidObjectId } from 'mongoose'

// Models
import User, {IschemaUser} from '../../models/user/user'
import Post, {SchemaPost} from '../../models/post/post'

export const createPost: RequestHandler = async (req, res, next) => {

    try {

        const userID: IschemaUser = req.session!.userID
        const { content } = req.body as {content: string}

        if (!content || content === "") {
            return next(createError(400, "Content cannot be empty."))
        }

        const newPostByUser = new Post({
            content,
            postedBy: userID
        }).populate('posts')

        await newPostByUser.save()

        await User.findOneAndUpdate({_id: userID}, {
            $addToSet: {
                posts: newPostByUser._id
            }
        })

        res.status(200).json({
            status: res.status,
            postCreated: newPostByUser
        })
        
    } catch (err) {
        next(createError(400, 'Please try again'))
    }

}

export const deletePost: RequestHandler = async (req, res, next) => {

    try {

        const postID = req.params.postID

        if (!postID || postID === null || postID === undefined || postID === "") {
            return next(createError(400, "Please input postID."))
        }

        if (!isValidObjectId(postID)) {
            return next(createError(400, "Please input valid postID."))
        } 

        const userID: IschemaUser = req.session!.userID

        const ifFound = await Post.findOneAndRemove({_id: postID })

        if (ifFound) {
            return res.status(200).json({
                status: res.statusCode,
                msg: 'Post deleted.'
            })
        } else {
            return res.status(200).json({
                status: res.statusCode,
                msg: 'No post found.'
            })
        }
        
    } catch (err) {
        next(createError(400, 'Please try again.'))
    }

}

export const updatePost: RequestHandler = async (req, res, next) => {

    try {

        const postID = req.params.postID
        const {newContent} = req.body as {newContent: string}

        if (!isValidObjectId(postID)) {
            return next(createError(400, "Please enter valid postID"))
        }

        const foundPost = await Post.findOne({_id : postID})

        if (foundPost) {
            await Post.findOneAndUpdate({_id: postID}, {
                content: newContent
            })

            return res.status(200).json({
                status: res.status,
                msg: "Content Updated."
            })
        } else {
            return next(createError(400, "Post not found."))
        }

        
    } catch (err) {
        next(createError(400, "Please try again."))
    }

}