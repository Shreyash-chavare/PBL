import express from 'express'
import session from 'express-session';
import userRouter from './Routes/userRouter.js'
import path from 'path'
import cookieparser from 'cookie-parser'
import cors from "cors";
const app=express();
import { fileURLToPath } from 'url';
import mongodb from './config/mongoose-connection.js'
import isLoggedIn from './middleware/isloggedin.js';
const Mongo=mongodb
import dotenv from 'dotenv';
dotenv.config();

app.set('view engine','ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieparser());

app.use(session({
    secret: process.env.JWT_TOKEN,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } 
}))

app.use(cors());
const __filename = fileURLToPath(import.meta.url); 
let __dirname = path.dirname(__filename); 
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.set('view engine','ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieparser());
app.use(express.static(path.join(__dirname,'public')));
// middleware to set user in response
app.use((req, res, next) => {
    if (req.session.user) {
        res.locals.user = req.session.user;
    }
    next();
});
app.use('/',userRouter);

//Renders the react home page immediately after website loads
// const parentDir = path.join(__dirname, "..")
// const reactPath = path.join(parentDir, "Frontend", "dist");
// app.use(express.static(reactPath));

// app.get("*", (req, res) => {
//     res.sendFile(path.join(reactPath, "index.html"));
// });


__dirname=path.dirname(fileURLToPath(import.meta.url))


app.use(express.static(path.join(__dirname,'public')));




// app.get('/',isLoggedIn,(req,res)=>{
//     if(req.isAuthenticated){
//         res.render('home');
//     }
//     else{
//         res.redirect('/login');
//     }  
    
// })
app.use('/',userRouter);
app.post("/api/compile", async (req, res) => {
    const { script, language, stdin } = req.body;
    const clientId = process.env.JDOODLE_CLIENT_ID;
    const clientSecret = process.env.JDOODLE_CLIENT_SECRET;
    const apiUrl = "https://api.jdoodle.com/v1/execute";

    const requestData = {
        clientId,
        clientSecret,
        script,
        language,
        versionIndex: language === "python3" ? "3" : "0",
        stdin: stdin || ""
    };

    try {
        console.log("Request data:", requestData); 

        const response = await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestData),
        });

        const responseText = await response.text();
        console.log("Full response from API:", responseText);

        const result = JSON.parse(responseText); 
        res.json({ output: result.output || result.error });
    } catch (error) {
        console.error("Error occurred while fetching data from JDOODLE API:", error);
        res.status(500).json({ error: "Failed to fetch" });
    }
});
app.get('/',isLoggedIn,(req,res)=>{
    if(req.isAuthenticated){
        res.render('home');
    }
    else{
        res.redirect('/login');
    }  
    
})


Mongo.then(()=>{
    console.log("mongodb connected")
}).catch(err=>{
    console.error("Mongodb connection error",err)
})


app.listen(3000);