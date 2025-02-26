import { response, request} from 'express';
import Comment from './comment.model.js';
import Publication from '../publications/publication.model.js';

export const saveComment = async (req, res) =>{
    try {
        const data = req.body;
        const publication = await Publication.findOne({title: data.title})
        const user = req.usuario;
        const comment = await Comment.create({
            publisher: user._id,
            text: data.text,
        })

        if(!publication){
            return res.status(404).json({
                success: false,
                msg:'No existe una publicacion con ese nombre'
            })
        }
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
        const user = await Comment.findById(id).select('publisher');
        const autheticatedUser = req.usuario;
        const { _id, title, ...data} = req.body;

        if(autheticatedUser._id.toString() === user.publisher.toString()){
            const comment = await Comment.findByIdAndUpdate(id, data, {new: true});
            return res.status(200).json({
                success: true,
                msg: 'Comment update successfully!',
                comment
            })
        }

        return res.status(403).json({
            success: false,

            msg:'Only the user can edit their comment',
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Error to update the comment',
            error: error.message
        })
    }
}

export const deleteComment = async (req, res = response) => {
    try {
        const { id } = req.params;
        const user = await Comment.findById(id).select('publisher');
        const autheticatedUser = req.usuario;

        if(autheticatedUser._id.toString() === user.publisher.toString()){
            const comment = await Comment.findByIdAndUpdate(id, {status:false}, {new: true});
            await Publication.findByIdAndUpdate(comment.publisher, {
                $pull : {comments: comment._id}
            });

            return res.status(200).json({
                success: true,
                msg:'Comment deleted successfully',
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
            msg: 'Error to delete the comment',
            error: error.message
        })
    }
}