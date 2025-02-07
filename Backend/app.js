import express from 'express'
import session from 'express-session';
import userRouter from './Routes/userRouter.js'
import path from 'path'
import cookieparser from 'cookie-parser'
const app=express();
import { fileURLToPath } from 'url';
import mongodb from './config/mongoose-connection.js'
const Mongo=mongodb
import dotenv from 'dotenv';
dotenv.config();
const __dirname=path.dirname(fileURLToPath(import.meta.url))
app.set('view engine','ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieparser());
app.use(express.static(path.join(__dirname,'public')));
app.get('/',(req,res)=>{
    res.render('home')
})
app.use(session({
    secret: process.env.JWT_TOKEN,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } 
}));

// middleware to set user in response
app.use((req, res, next) => {
    if (req.session.user) {
        res.locals.user = req.session.user;
    }
    next();
});

app.use('/',userRouter);



Mongo.then(()=>{
    console.log("mongodb connected")
}).catch(err=>{
    console.error("Mongodb connection error",err)
})


app.listen(3000);