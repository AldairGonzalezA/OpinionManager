import jwt from 'jsonwebtoken';
import User from '../users/user.model.js';

export const validarJWT = async (req, res, next) => {
    const token = req.header('x-token');
    
    if(!token){
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        })
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const usuario = await User.findById(uid);

        if(!usuario){
            return res.status(401).json({
                msg:'Usuaio not exists in the database'
            })
        }
        if(!usuario.status){
            return res.status(401).json({
                msg: 'Token is invalid or user is disabled'
            })
        }

        req.usuario = usuario;

        next();
    } catch (error) {
        res.status(401).json({
            msg:'Token no valido'
        })
    }
}