import User from '../users/user.model.js';

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