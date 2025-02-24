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

export const updateComment = async (req, res = response) => {
    try {
        const { id } = req.params;
        const { _id, ...data } = req.body;
        const user = await Comment.findById(id).selec('publisher');
        const authoticatedUser = req.usuario;
        if(authoticatedUser._id.toString() === user.publisher.toString()){
            const comment = await Comment.findByIdAndUpdate(id, data, {new: true});
            return res.status(200).json({
                success:true,
                msg: 'Comment updated successfully',
                comment
            })
        }

        return res.status(403).json({
            success: false,
            msg: 'Only the user can update their comment'
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Error to update the comment'
        })
    }
}

export const deleteComment = async (req, res = response) => {
    try {
        const { id } = req.params;
        const user = await Comment.findById(id).selec('publisher');
        const authoticatedUser = req.usuario;
        if(authoticatedUser._id.toString() === user.publisher.toString()){
            const comment = await Comment.findByIdAndDelete(id);

            return res.status(200).json({
                success: true,
                msg: 'Comment deleted successfully',
                comment
            })
        }

        return res.status(403).json({
            success: false,
            msg: 'Only the user can delete their comment'
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Error to delete the comment'
        })
    }
}