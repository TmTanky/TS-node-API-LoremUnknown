import mongoose, {Document} from 'mongoose'

import { IschemaUser } from '../../models/user/user'

export interface Icomment extends Document {
    comment: string;
    commentBy: IschemaUser;
    commentLikes: IschemaUser[];
    replies: IschemaUser[];
}

const commentSchema = new mongoose.Schema({
    comment: String,
    commentBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    commentLikes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    replies: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
})

const Comment = mongoose.model<Icomment>('Comment', commentSchema)

export default Comment