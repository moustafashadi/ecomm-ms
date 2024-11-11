import express from "express";
import ExpressFormidable from "express-formidable";
const router = express.Router();
import { addProduct } from "../controllers/ProductController.js";
import {checkId} from "../middlewares/checkId.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

router.post("/", authenticate, authorizeAdmin, ExpressFormidable(), addProduct);

export default router;