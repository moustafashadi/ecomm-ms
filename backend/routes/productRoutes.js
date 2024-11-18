import express from "express";
import ExpressFormidable from "express-formidable";
const router = express.Router();
import { addProduct, 
    updateProduct, 
    removeProduct, 
    getProduct,
    getProducts } from "../controllers/ProductController.js";
import {checkId} from "../middlewares/checkId.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

router
    .route("/")
    .get(getProducts)
    .post( authenticate, authorizeAdmin, ExpressFormidable(), addProduct);
router
    .route("/:id")
    .put(authenticate, authorizeAdmin, ExpressFormidable(), updateProduct)
    .delete(authenticate, authorizeAdmin, removeProduct)
    .get(getProduct);

export default router;