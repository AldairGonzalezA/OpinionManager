import User from '../users/user.model.js';
import Publication from '../publications/publication.model.js';
import Comment from '../comments/comment.model.js';
import Category from '../category/category.model.js';

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
    const existePubli = await Publication.findById(id);
    if(!existePubli){
        throw new Error(`La publicacion con ID ${id} no existe en la base de datos`)
    }
}

export const existeComment = async (id = '') => {
    const existeComment = await Comment.findById(id);
    if(!existeComment){
        throw new Error(`El commentario con ID ${id} no existe en la base de datos`)
    }
}

export const existeCategory = async (id = '') => {
    const existeCategory = await Category.findById(id);
    if(!existeCategory){
        throw new Error(`La categoria con ID ${id} no existe en la base de datos`);
    }
}