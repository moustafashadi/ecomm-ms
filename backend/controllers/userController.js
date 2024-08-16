import User from '../models/userModel.js';
import asyncHandler from '../middlewares/asyncHandler.js';
import bcrypt from 'bcryptjs';
import createToken from '../utils/createToken.js';

const createUser = asyncHandler(async(req,res)=>{
    const {username, email, password} = req.body;
    //if any of the fields are empty, send a 400 status code and throw an error
    if(!username || !email || !password){
        res.status(400);
        throw new Error('Please provide all the fields');
    }
    //if the user already exists, send a 400 status code and throw an error
    const userExists = await User.findOne({email});
    if (userExists) res.status(400).send("user already exists");

    //create salt
    const salt = await bcrypt.genSalt(10);
    //hash both the password and salt
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({username, email, password : hashedPassword /*hashedPassword is a property of password*/});
    
    //save the new user to the database
    try{
        await newUser.save();
        //generate a token for the user
        createToken(res, newUser._id);
        res.status(201).json({
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
        });
    }catch(error){
        res.status(400)
        throw new Error('Invalid data');
    }
});

const loginUser = asyncHandler(async(req,res)=>{
    const {email,password} = req.body;

    const existingUser = await User.findOne({email});
    if(existingUser){
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);

        if (isPasswordValid){
            createToken(res, existingUser._id);
            res.status(200).json({
                _id: existingUser._id,
                username: existingUser.username,
                email: existingUser.email,
                isAdmin: existingUser.isAdmin,
            });
            return //return to avoid the else block
        }
    }
});

const logoutCurrentUser = asyncHandler(async(req,res)=>{
    res.cookie('jwt', '',{
        httpOnly:true,
        expires: new Date(0)
    })
    res.status(200).json({message: 'Logged out successfully'});
});

const getAllUsers = asyncHandler(async(req,res)=>{
    const users = await User.find({});
    res.json(users);    
});

const getCurrentUserProfile = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.user._id);
    if(user){
        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
        });
    }else{
        res.status(404);
        throw new Error('User not found');
    }
});

const updateCurrentUserProfile = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.user._id);
    
    //if user doesnt enter new username or email, keep the old one
    if(user){
        user.username = req.body.username || user.username;
        user.email = req.body.email || user.email;
        //if a new password is provided, hash it with a newly generated salt and set it as the new password
        if(req.body.password){
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(req.body.password, salt);
        }
        const updatedUser = await user.save();
        res.json({
            _id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        });
    } else{
        res.status(404);
        throw new Error('User not found');
    }
});

export {
    createUser, 
    loginUser, 
    logoutCurrentUser, 
    getAllUsers,
    getCurrentUserProfile,
    updateCurrentUserProfile
};