import { response, request} from 'express';
import Comment from './comment.model.js';
import Publication from '../publications/publication.model.js';

export const saveComment = async (req, res) =>{
    try {
        const data = req.body;
        const publication = await Publication.findOne({Title: data.title})
        const comment = await Comment.create({
            publisher: publication._id,
            text: data.text,
        })

        await Publication.findByIdAndUpdate(publication._id, {
            $push: { comments: comment._id}
        })

        return res.status(200).json({
            msg: 'Comment registered successfully!',
            commentDetails:{
                comment: comment.text
            }
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            msg:'Error to create the comment',
            error: error.message
        })
    }
}