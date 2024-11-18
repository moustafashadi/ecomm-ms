import { RiQqFill } from "react-icons/ri";
import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../models/productModel.js";


const addProduct = asyncHandler(async (req, res) => {
    try {
        const { name, description, price , category, quantity, brand } = req.fields;
        switch(true){
            case !name:
                return res.json({ error: "Name is required" });
            case !description:
                return res.json({ error: "Description is required" });
            case !price:
                return res.json({ error: "Price is required" });
            case !category:
                return res.json({ error: "Category is required" });
            case !quantity:
                return res.json({ error: "Quantity is required" }); 
            case !brand:
                return res.json({ error: "Brand is required" });
        }
        const product = new Product({...req.fields});
        await product.save();
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(400).json(error.message);
    }
});

const updateProduct = asyncHandler(async (req, res) => {
    try {
        // Destructure fields from req.fields
        const { name, description, price, category, quantity, brand } = req.fields;

        if (name == null || name.trim() === '') {
            return res.json({ error: "Name is required" });
        }
        if (description == null || description.trim() === '') {
            return res.json({ error: "Description is required" });
        }
        if (price == null || price === '' || isNaN(Number(price))) {
            return res.json({ error: "Price is required and must be a valid number" });
        }
        if (category == null || category.trim() === '') {
            return res.json({ error: "Category is required" });
        }
        if (quantity == null || quantity === '' || isNaN(Number(quantity))) {
            return res.json({ error: "Quantity is required and must be a valid number" });
        }
        if (brand == null || brand.trim() === '') {
            return res.json({ error: "Brand is required" });
        }

        const product = await Product.findById(req.params.id,);

        await product.updateOne({ ...req.fields }, { new: true });

        if (!product) return res.status(404).json({ error: "Product not found" });

        await product.save();

        res.json(product);

    } catch (error) {
        console.error("Error in updateProduct:", error);
        res.status(400).json({ error: error.message });
    }
});

const removeProduct = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if(product){
            await product.deleteOne();
            res.json({ message: "Product removed successfully" });
        } else{
            return res.status(404).json({ error: "Product not found" });
        }
    } catch (error) {
        console.error("Error in removing product: ", error);
        res.status(500).json({ error: error.message });
    }
});

//FETCHES PRODUCTS BY KEYWORD
const getProducts = asyncHandler(async (req, res) => {
    try {
        const pageSize = 6;
        const keyword = req.query.keyword ? {
            name: {
                $regex: req.query.keyword,
                $options: "i"
            }
        } : {};
        
        const count = await Product.countDocuments({ ...keyword });

        const products = await Product.find({ ...keyword })
            .limit(pageSize)
            .skip(pageSize * (req.query.pageNumber - 1));

        res.json({ products, page: 1, pages: Math.ceil(count / pageSize), hasMore: false});
    } catch (error) {
        console.error("Error while getting products: ", error);
        res.status(500).json({ error: error.message });
    }
});

//FETCHES A PRODUCT BY ID

const getProduct = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        
        if (product) {
            return res.json(product);
        } else {
            res.status(404).json({ error: "Product not found" });
        }
    } catch (error) {
        console.error("Error while getting product:", error);
        res.status(500).json({ error: error.message });
    }
});




export { addProduct
    , updateProduct
    , removeProduct
    , getProducts
    , getProduct
 };