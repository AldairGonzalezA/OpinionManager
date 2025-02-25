import { Schema, model } from "mongoose";

const PublicationSchema = Schema({
    title:{
        type: String,
        required: [true, 'Title is required'],
        maxLength: [25, 'Cant be overcome 25 characters']
    },
    category:{
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'The pulication need a category']
    },
    mainText:{
        type: String,
        required: [true, 'The post cannot be empty ']
    },
    status:{
        type: Boolean,
        default: true
    },
    publisher:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'The publication need a publisher']
    },
    comments:[{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }],

}, 
{
    timesStamp:true,
    versionKey: false
}
);

export default model('Publication', PublicationSchema);