import mongoose, {Document, Schema} from 'mongoose'

interface SchemaPost extends Document {
    postedBy: string;
    comments: string;
    likes: string;
    createdAt: Date;
}

const postSchema: Schema = new mongoose.Schema({
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
    ],
    createdAt: new Date()
})

const Post = mongoose.model<SchemaPost>(`Post`, postSchema)

export default Post