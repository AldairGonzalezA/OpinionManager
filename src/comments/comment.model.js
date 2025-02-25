import { Schema, model } from 'mongoose';

const CommentSchema = Schema({
    publisher: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    text:{
        type: String,
        required: [true, 'The comment need a text']
    },
    status:{
        type: Boolean,
        default: true
    }
},
    {
        timestamps: true,
        versionKey: false
    }
);

export default model('Comment', CommentSchema);