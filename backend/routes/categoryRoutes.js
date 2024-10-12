import express from 'express';
const router = express.Router();
import { authenticate, authorizeAdmin } from '../middlewares/authMiddleware.js';
import { 
    createCategory,
    updateCategory,
    deleteCategory,
    listCategories,
    getCategory
} from '../controllers/categoryController.js';


router.route('/')
    .post(authenticate, authorizeAdmin, createCategory) // Create a category (admin only)
    .get(listCategories); // List all categories, no authentication needed

// Get, update, or delete a category by ID
router.route('/:id')
    .put(authenticate, authorizeAdmin, updateCategory)
    .delete(authenticate, authorizeAdmin, deleteCategory)
    .get(getCategory);

export default router;
