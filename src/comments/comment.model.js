import { Schema, model } from 'mongoose';

const CommentSchema = Schema({
    publisher: {
        type: Schema.Types.ObjetcsId,
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
})

export default model('Comment', CommentSchema);