import mongoose, {Document, Schema} from 'mongoose'

import { IschemaUser } from '../user/user'

export interface SchemaPost extends Document {
    content: string;
    postedBy: IschemaUser[]
    comments: IschemaUser[]
    likes: IschemaUser[]
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
            ref: 'User'
        }
    ],
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
})

const Post = mongoose.model<SchemaPost>('Post', postSchema)

export default Post