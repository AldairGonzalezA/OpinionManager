import { response, request } from 'express';
import { hash, verify } from 'argon2';
import User from './user.model.js';

export const getUsers = async (req = request, res = response) =>{
    try {
            const { limite = 10, desde = 0} = req.query;
            const query = {status: true};

            const [total, users] = await Promise.all([
                User.countDocuments(query),
                User.find(query)
                    .skip(Number(desde))
                    .limit(Number(limite))
            ]);

            res.status(200).json({
                success: true,
                total,
                users
            })
    } catch (error) {
        res.status(500).json({
            success:  false,
            msg: 'Error to gets Users',
            error: error.message || error
        })
    }
}

export const searchUser = async (req,res) =>{
    try {
        const { id } = req.params;
        const user = await User.findById(id)
        if(!user){
            return res.status(404).json({
                success: false,
                msg: 'User not found'
            })
        }

        res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            msg:'Erro to search the user',
            error: error.message
        })
    }
}

export const updateUser = async (req, res = response) =>{
    try {
        const { id } = req.params;
        const{_id, email, password, ...data} = req.body;
        const user = await User.findByIdAndUpdate(id, data, {new: true});

        res.status(200).json({
            success: true,
            msg: 'User update successfully',
            user
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            msg:'Error to update the user',
            error: error.message
        })
    }
}

export const updatePassword = async (req, res = response) =>{
    try {
        const { id } = req.params;
        const data = req.body
        const password  = data.password;
        const  oldPassword  = data.oldPassword;
        const user = await User.findById(id);
        const validPassword = await verify(user.password, oldPassword);
        if(!validPassword){
            return res.status(400).json({
                msg:'La contraseña antigua es incorrecta'
            })
        }
        if(password){
            data.password = await hash(password);
        }
        const updateUser = await User.findByIdAndUpdate(id, {password:data.password}, {new: true});

        res.status(200).json({
            success: true,
            msg: 'Password update!!',
            updateUser
        })
    
    } catch (error) {
        res.status(500).json({
            success: false,
            msg:'Error to update the password',
            error: error.message
        })
    }
}