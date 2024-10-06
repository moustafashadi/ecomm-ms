import express from 'express';
import { 
    createUser, 
    loginUser , 
    logoutCurrentUser,
    getAllUsers ,
    getCurrentUserProfile,
    updateCurrentUserProfile,
    deleteUserById,
    getUserById,
    updateUserById
} from '../controllers/userController.js';
const router = express.Router();
import { authenticate, authorizeAdmin } from '../middlewares/authMiddleware.js';

router
    .route('/')
    .post(createUser)
    .get(authenticate, authorizeAdmin, getAllUsers)
    
router.post('/auth', loginUser)
router.post('/logout',logoutCurrentUser)

router.route('/profile')
    .get(authenticate, getCurrentUserProfile)
    .put(authenticate, updateCurrentUserProfile)

//admin routes below
router.route('/:id')
    .delete(authenticate, authorizeAdmin, deleteUserById)
    .get(authenticate, authorizeAdmin, getUserById)
    .put(authenticate, authorizeAdmin, updateUserById)

export default router;