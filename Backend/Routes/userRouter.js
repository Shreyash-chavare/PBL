import express from 'express'
import authuser from '../controllers/userauth.js'
import userlog from '../controllers/userlogin.js'
import isLoggedIn from '../middleware/isloggedin.js';
import logoutuser from '../controllers/logout.js';
import user from '../models/usermodel.js';
import userModel from '../models/usermodel.js';
const router=express.Router();
router.get('/signup',(req,res)=>{
    res.render('signup');
})
router.get('/login',(req,res)=>{
    res.render('login')
})
router.get('/home',isLoggedIn,(req,res)=>{
    res.render('home')
})
router.get('/profile',isLoggedIn,(req,res)=>{
        const user = req.session.user;
        if (user) {
            res.render('profile', { user });
        } else {
            res.status(404).send('User not found');
        }
})

router.post('/createusers',authuser);
router.post('/login',userlog);
router.get('/home',isLoggedIn);
router.get('/logout',logoutuser);
export default router;