import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import asyncHandler from './asyncHandler.js';

const authenticate = asyncHandler(async (req, res, next) => {
    let token;

    // Read JWT token from the cookies
    token = req.cookies.jwt;

    if (token) {
        try {
            const decodedJWT = jwt.verify(token, process.env.JWT_SECRET);
            
            req.user = await User.findById(decodedJWT.userId).select("-password");
            
            if (!req.user) {
                throw new Error('User not found');
            }

            next();
        } catch (error) {
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    } else {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
});


//check if the user is an admin
const authorizeAdmin = (req,res,next)=>{
    if (req.user && req.user.isAdmin){
        next();
    } else{
        res.status(401).send('Not authorized as an admin');
    }
};

export {authenticate, authorizeAdmin};