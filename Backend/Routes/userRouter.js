import express from 'express'
import authuser from '../controllers/userauth.js'
import userlog from '../controllers/userlogin.js'
import isLoggedIn from '../middleware/isloggedin.js';
import logoutuser from '../controllers/logout.js';
import { fileURLToPath } from 'url';
import path from 'path';
import user from '../models/usermodel.js';
import userModel from '../models/usermodel.js';
const router=express.Router();
router.get('/page',(req,res)=>{
    res.render('front');
})
router.get('/login',(req,res)=>{
    res.render('login')
})


const __filename = fileURLToPath(import.meta.url); 
let __dirname = path.dirname(__filename); 
let parentDir = path.join(__dirname, "..")
parentDir = path.join(parentDir, "..")
const reactPath = path.join(parentDir, "Frontend", "dist");
router.get('/home',isLoggedIn,(req,res)=>{
    res.sendFile(path.join(reactPath, "dashboard.html"))
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