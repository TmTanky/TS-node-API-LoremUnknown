import mongoose, {Document, Schema} from 'mongoose'

// Interface 
import { SchemaPost } from '../post/post'

export interface IschemaUser extends Document {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    posts: SchemaPost[]
}

const userSchema: Schema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    username: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post'
        }
    ]
})

const User = mongoose.model<IschemaUser>('User', userSchema)

export default User
