import mongoose, {Document, Schema} from 'mongoose'

export interface IschemaUser extends Document {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
}

const userSchema: Schema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    username: String,
    email: {
        type: String,
        unique: true
    },
    password: String
})

const User = mongoose.model<IschemaUser>('User', userSchema)

export default User
