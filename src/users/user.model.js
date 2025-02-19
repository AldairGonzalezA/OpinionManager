import { Timestamp } from "bson";
import { Schema, model } from "mongoose";

const UserSchema = Schema({
    name:{
        type: String,
        required: [true, 'Name is required'],
        maxLength: [25, 'Cant be overcome 25 characters']
    },
    surname: {
        type: String,
        required: [true, 'Surname is required'],
        maxLength: [25, 'Cant be overcome 25 characters']
    },
    username:{
        type: String,
        unique: true
    },
    email:{
        type: String,
        required: [true, 'Email is required'],
        maxLength: [25, 'Cant be overcome 25 characters']
    },
    password:{
        type: String,
        required: [true, 'Password is required']
    },
    phone:{
        type: String,
        minLength: 8,
        maxLength: 8,
        required: [true, 'Phone number is required']
    },
    role:{
        type:String,
        required: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    status:{
        type: Boolean,
        default: true
    },
    publications:[{
        type: Schema.Types.ObjectId,
        ref: 'Publication',
    }]
},
    {
        Timestamp: true,
        vesionKey: false
    }
);

export default model('User', UserSchema);