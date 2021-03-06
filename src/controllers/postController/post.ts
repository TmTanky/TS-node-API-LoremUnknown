import { RequestHandler } from 'express'
import createError from 'http-errors'
import { isValidObjectId } from 'mongoose'

// Models
import User, {IschemaUser} from '../../models/user/user'
import Post, {SchemaPost} from '../../models/post/post'
import Comment, {Icomment} from '../../models/comment/comment'

export const getAllPost: RequestHandler = async (req, res ,next) => {

    try {

        const allPost: SchemaPost[] = await Post.find({}).populate('postedBy').populate('comments').populate({
            path: 'comments',
            populate: 'commentBy commentLikes'
        }).populate('likes')

        res.status(200).json({
            status: res.status,
            data: allPost
        })
        
    } catch (err) {
        next(createError(400, 'Please try again'))
    }

}

export const createPost: RequestHandler = async (req, res, next) => {

    try {

        const userID = req.params.userID
        const {isHidden} = req.body as {isHidden: boolean}
        const {content} = req.body.createPost as {content: string}

        if (!content || content === "") {
            return next(createError(400, "Content cannot be empty."))
        }

        const newPostByUser = new Post({
            content,
            postedBy: userID,
            isHidden
        }).populate('postedBy')

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
        let {newContent} = req.body as {newContent: string}

        if (!isValidObjectId(postID)) {
            return next(createError(400, "Please enter valid postID"))
        }
        
        const foundPost = await Post.findOne({_id: postID})
        
        if (newContent === "") {

            newContent = foundPost?.content!

            await Post.findOneAndUpdate({_id: postID}, {
                content: newContent
            })

            return res.status(200).json({
                status: res.status,
                msg: "Content Updated."
            })
            
        }

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

export const likedPost: RequestHandler = async (req, res, next) => {

    try {

        const postID = req.params.postID
        const user: IschemaUser = req.body

        if (!isValidObjectId(postID)) {
            return next(createError(400, "Please input valid postID"))
        }

        const foundDoc = await Post.findOne({_id: postID})
        const isAlreadyLiked = foundDoc?.likes.includes(user._id)
        
        if (isAlreadyLiked) {
            await Post.findOneAndUpdate({_id: postID}, {
                $pull: {
                    likes: user._id
                }
            })
        } else {
            await Post.findOneAndUpdate({_id: postID}, {
                $addToSet: {
                    likes: user._id
                }
            })
    
            return res.status(200).json({
                status: res.status,
                msg: "You liked this post."
            })
        }
        
    } catch (err) {
        next(createError(400, "Please try again."))
    }

}

export const unlikedPost: RequestHandler = async (req, res, next) => {

    try {

        const postID = req.params.postID
        const userID: IschemaUser = req.session!.userID

        if (!isValidObjectId(postID)) {
            return next(createError(400, "Please input valid postID"))
        }

        const ifFound = await Post.findOne({_id: postID})

        if (ifFound) {
            await Post.findOneAndUpdate({_id: postID}, {
                $pull: {
                    likes: userID
                }
            })
    
            return res.status(200).json({
                status: res.status,
                msg: "You unliked this post."
            })
        } else {
            return next(createError(400, "No post found"))
        }
        
    } catch (err) {
        next(createError(400, "Please try again"))
    }

}

export const commentInPost: RequestHandler = async (req, res, next) => {

    try {

        const user = req.body as {user: IschemaUser}
        const {comment} = req.body as {comment: {current: string}}
        const postID = req.params.postID

        if (!comment.current || comment.current === "") {
            return next(createError(400, "Comment can't be empty."))
        }

        if (!isValidObjectId(postID)) {
            return next(createError(400, "Please input valid postID"))
        }

        const newComment = new Comment({
            comment: comment.current,
            commentBy: user.user._id
        })

        await newComment.save()

        const ifFound = await Post.findOne({_id: postID})

        if (ifFound) {
            await Post.findOneAndUpdate({_id: postID}, {
                $addToSet: {
                    comments: newComment._id
                }
            })

            return res.status(200).json({
                status: res.status,
                msg: "You commented on this post."
            })
        } else {
            next(createError(400, "Can't find any document."))
        }
        
    } catch (err) {
        next(createError(400, "Please try again."))
    }

}

export const deleteComment: RequestHandler = async (req, res, next) => {

    try {
        
        const postID = req.params.postID
        const commentID = req.params.commentID

        if (!isValidObjectId(commentID)) {
            return next(createError(400, "Please input valid postID"))
        }

        const ifFound = await Comment.findOne({_id: commentID})

        if (ifFound) {

            await Comment.findOneAndRemove({_id: commentID})

            await Post.findOneAndUpdate({_id: postID}, {
                $pull: {
                    comments: commentID
                }
            })

            return res.status(200).json({
                status: res.status,
                msg: "You deleted a comment on this post."
            })

        } else {
            return next(createError(400, "Can't find any document."))
        }

    } catch (err) {
        next(createError(400, "Please try again."))
    }

}

export const updateCommentPost: RequestHandler = async (req, res, next) => {

    try {

        const {newComment} = req.body as {newComment: string}
        const commentID = req.params.commentID

        if (!newComment) {
            return next(createError(400, "Comment must not be empty."))
        }

        if (!isValidObjectId(commentID)) {
            return next(createError(400, "Please input valid postID"))
        }

        const ifFound = await Comment.findOne({_id: commentID})

        if (ifFound) {

            await Comment.findOneAndUpdate({_id: commentID}, {
                comment: newComment
            })

            return res.status(200).json({
                status: res.status,
                msg: "You update your comment on this post."
            })

        } else {
            return next(createError(400, "Can't find any document."))
        }

        
    } catch (err) {
        next(createError(400, "Please try again."))
    }

}

export const reactToComment: RequestHandler = async (req, res, next) => {

    try {

        const commentID = req.params.commentID
        const user: IschemaUser = req.body

        const ifFound = await Comment.findOne({_id: commentID})

        if (ifFound?.commentLikes.includes(user._id)) {

            await Comment.findOneAndUpdate({_id: commentID}, {
                $pull: {
                    commentLikes: user._id
                }
            })

            return res.status(200).json({
                msg: 'You unliked this comment.'
            })

        } else {

            await Comment.findOneAndUpdate({_id: commentID}, {
                $addToSet: {
                    commentLikes: user._id
                }
            })

            return res.status(200).json({
                msg: 'You liked this comment.'
            })

        }
        
    } catch (err) {
        next(createError(400, 'Please try again.'))
    }

}