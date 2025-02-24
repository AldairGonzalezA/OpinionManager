import { response, request} from 'express';
import Category from './category.model.js';
import Publication from '../publications/publication.model.js';

export const saveCategory = async (req, res) => {
    try {
        const data = req.body;
        
        const category = await Category.create({
            name: data.name,
            description: data.description
        })

        return res.status(200).json({
            success: true,
            msg: 'category created successfully!',
            categoryDetails:{
                category: category.name
            }
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Error to save the category',
            error: error.message
        })
    }
}

export const getCategory = async (req = request, res = response) => {
    try {
        const {limite = 10, desde = 0} = req.query;
        const query = {status:true};

        const [total, categories] = await Promise.all([
            Category.countDocuments(query),
            Category.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
        ]);

        res.status(200).json({
            success: true,
            total,
            categories
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Error to get the categories',
            error: error.message
        })
    }
}

export const searchCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findById(id);

        if(!category){
            return res.status(404).json({
                success: false,
                msg: 'Category not found'
            })
        }

        res.status(200).json({
            success: true,
            category
        })
    } catch (error) {
        res.status(500).json({
            success: true,
            msg: 'Error to search the category',
            error: error.message
        })
    }
}

export const updateCategory = async (req, res = response) => {
    try {
        const { id } = req.params;
        const { _id, ...data} = req.body;
        const category = await Category.findByIdAndUpdate(id, data, {new: true});

        res.status(200).json({
            success: true,
            msg: 'Category update successfully!',
            category
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Error to update the category',
            error: error.message
        })
    }
}

export const deleteCategory = async (req, res = response) => {
    try {
        const { id } = req.params;
        const category = await Category.findBy(id);

        const publications = await Publication.countDocuments

        
        
        res.status(200).json({
            success: true,
            msg: 'Category deleted successfully!',
            category
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Error to delete the category',
            error: error.message
        })
    }
}