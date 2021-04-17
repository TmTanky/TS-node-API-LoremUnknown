import mongoose, {Document, Schema} from 'mongoose'
import { Icomment } from '../comment/comment'

import { IschemaUser } from '../user/user'

export interface SchemaPost extends Document {
    content: string;
    postedBy: IschemaUser[];
    comments: Icomment[];
    likes: IschemaUser[];
    isHidden: boolean
}

const postSchema: Schema = new mongoose.Schema({
    content: String,
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    isHidden: Boolean
})

const Post = mongoose.model<SchemaPost>('Post', postSchema)

export default Post