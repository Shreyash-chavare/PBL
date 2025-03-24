import express from 'express'
import session from 'express-session';
import userRouter from './Routes/userRouter.js'
import path from 'path'
import cookieparser from 'cookie-parser'
import cors from "cors";
import { fileURLToPath } from 'url';
import { createServer } from 'http';
import mongodb from './config/mongoose-connection.js'
import isLoggedIn from './middleware/isloggedin.js';
import dotenv from 'dotenv';
import { Server } from "socket.io";



const app=express();
const server = createServer(app);
const PORT = process.env.PORT || 3000;

dotenv.config();

const Mongo=mongodb
Mongo.then(()=>{
    console.log("mongodb connected")
}).catch(err=>{
    console.error("Mongodb connection error",err)
})



app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieparser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Accept', 'Authorization']
}));
    

app.use(session({
    secret: process.env.JWT_TOKEN,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } 
}))

app.use('/',userRouter);

    const __filename = fileURLToPath(import.meta.url); 
    let __dirname = path.dirname(__filename); 
    
    
    app.use(express.static(path.join(__dirname,'public')));

    const io = new Server(server, {
        cors: {
            origin: "http://localhost:5173",
            methods: ["GET", "POST"],
            credentials: true,
            transports: ['websocket']
        },
        pingTimeout: 60000,
        pingInterval: 25000
    })

    io.on('connection', (socket) => {
        console.log('User connected:', socket.id);

        // Store socket ID in a Set to track active connections
        const activeConnections = new Set();
        activeConnections.add(socket.id);

        socket.on("message", (data) => {
            console.log(`Message from ${socket.id}:`, data);
            io.emit("message", data);
        });

        socket.on('disconnect', (reason) => {
            console.log(`User disconnected (${reason}):`, socket.id);
            activeConnections.delete(socket.id);
        });

        // Handle errors
        socket.on('error', (error) => {
            console.error('Socket error:', error);
        });
    });


    app.use((req, res, next) => {
        if (req.session.user) {
            res.locals.user = req.session.user;
        }
        next();
    });
    
    
    
    
    __dirname=path.dirname(fileURLToPath(import.meta.url))
    
    
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
// app.get('/',isLoggedIn,(req,res)=>{
//     if(req.isAuthenticated){
//         res.render('home');
//     }
//     else{
//         res.redirect('/login');
//     }  
    
// })




server.listen(PORT, ()=>{
    console.log("Server running on port 3000")
});