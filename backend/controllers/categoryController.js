import asyncHandler from "../middlewares/asyncHandler.js";
import Category from "../models/categoryModel.js";

const createCategory = asyncHandler(async (req, res) => {
    try{
        const {name} = req.body;
        if(!name?.trim()){
            return res.json({error: "Category name is required"});
        }
        
        const existingCategory = await Category.findOne({name})
        if(existingCategory){
            return res.json({error: "Category already exists"});
        }

        const category = await new Category({name}).save();
        res.json(category);

    } catch(error){
        console.error(error);
        res.status(400).json(error);
    }
});

const updateCategory = asyncHandler(async (req, res) => {
    try {
        const {name} = req.body;
        const categoryId = req.params.id;

        const category = await Category.findById(categoryId);

        if(!category){
            return res.status(404).json({error: "Category not found"});
        }

        category.name = name;
        const updatedCategory = await category.save();
        res.json(updatedCategory);

    } catch (error) {
        console.error(error);
        res.status(500).json({message: error.message});
    }
});

const deleteCategory = asyncHandler(async (req, res) => {
    try {
        const categoryId = req.params.id;
        const category = await Category.findById(categoryId);

        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        await category.deleteOne({ _id: category._id });
        res.json({ message: "Category removed" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

const listCategories = asyncHandler(async(req, res) =>{
    try {
        const categories = await Category.find({});
        res.json(categories);
    } catch (error) {
        console.log(error);
        res.status(400).json({message: error.message});
    }
});

const getCategory = asyncHandler(async(req, res) =>{
    try {
        const category = await Category.findOne({_id: req.params.id});
        if(!category){
            return res.status(404).json({message: "Category not found"});
        } else{
            res.json(category);
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({message: error.message});
    }
});


export { createCategory, updateCategory, deleteCategory, listCategories, getCategory };