import User from '../users/user.model.js';
import Publication from '../publications/publication.model.js';

export const existenteEmail = async (correo = '') => {
    const existeEmail = await User.findOne({correo});
    if(existeEmail){
        throw new Error(`El correo ${correo} ya pertence a un usuario`);
    }
}

export const existeUserById = async (id ='') =>{
    const existeUser = await User.findById(id);
    if(!existeUser){
        throw new Error(`El ID: ${id} no pertenece a ningun usuario `);
    }
}

export const existePublicacion = async (id = '') => {
    cosnt existePubli = await Publication.findById(id);
    if(!existePubli){
        throw new Error(`La publicacion con ID ${id} no existe en la base de datos`)
    }
}