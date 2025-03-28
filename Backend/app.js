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
import { LeetCode } from 'leetcode-query';



const app = express();
const server = createServer(app);
const PORT = process.env.PORT || 3000;

dotenv.config();

const Mongo = mongodb
Mongo.then(() => {
    console.log("mongodb connected")
}).catch(err => {
    console.error("Mongodb connection error", err)
})



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Accept', 'Authorization']
}));


app.use(session({
    secret: process.env.JWT_TOKEN,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    },
    name: 'sessionId',
    rolling: true
}));

app.use('/', userRouter);

const __filename = fileURLToPath(import.meta.url);
let __dirname = path.dirname(__filename);


app.use(express.static(path.join(__dirname, 'public')));

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173", "http://localhost:5174"],
        methods: ["GET", "POST"],
        credentials: true,
        transports: ['websocket']
    },
    pingTimeout: 60000,
    pingInterval: 25000
})

const roomMembers = new Map();
let roomname = null; 
io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // Store socket ID in a Set to track active connections
    const activeConnections = new Set();
    activeConnections.add(socket.id);

    socket.on("message", (data) => {
        console.log(`Message from ${socket.id}:`, data);
        if (roomname) {
            socket.to(roomname).emit("message", data);
        } 
        
    });

    socket.on('disconnect', (reason) => {
        console.log(`User disconnected (${reason}):`, socket.id);
        activeConnections.delete(socket.id);
    });

    socket.on("join-room", (room) => {
        socket.join(room);
        roomname = room;
        console.log(`User joined room ${roomname}`);
    });

    socket.on("leave-room", () => {
        console.log(`User ${socket.id} left room ${roomname}`);
        socket.leave(roomname);
        roomname = null;
    });

    socket.on("add-member", ({room, username}) => {
        if(!roomMembers.has(room)) {
            roomMembers.set(room, new Set());
        }
        roomMembers.get(room).add(username);
        console.log(Array.from(roomMembers.get(room)))

        io.to(room).emit("members-update", Array.from(roomMembers.get(room)));
    });


    socket.on("remove-member", ({room,username}) => {
        if(roomMembers.has(room)) {
            roomMembers.get(room).delete(username);
            if(roomMembers.get(room).size === 0){
                roomMembers.delete(room);
            } else{
                io.to(room).emit("members-update", Array.from(roomMembers.get(room)));
            }
        }
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




__dirname = path.dirname(fileURLToPath(import.meta.url))




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



// Add before server.listen()
app.get('/api/leetcode/problems', async (req, res) => {
    const leetcode = new LeetCode();
    try {
        console.log('Fetching LeetCode problems...'); // Debug log
        const problemlist = await leetcode.problems();
        
        if (!problemlist) {
            throw new Error('No problems returned from LeetCode API');
        }

        // Cache the results for 1 hour
        const cacheData = {
            timestamp: Date.now(),
            data: problemlist
        };
        
        console.log(`Successfully fetched ${problemlist.questions.length} problems`); // Debug log
        res.json(problemlist.questions);
    } catch (error) {
        console.error('Detailed LeetCode API error:', {
            message: error.message,
            stack: error.stack
        });
        res.status(500).json({ 
            error: 'Failed to fetch problems',
            details: error.message 
        });
    }
});

app.get('/api/leetcode/problem/:id', async (req, res) => {
    try {
        const leetcode = new LeetCode();
        const problemlist = await leetcode.problems();
        const selected_problem = problemlist.questions.find(p => p.questionFrontendId === req.params.id.slice(1));
        console.log(req.params)
        if (!selected_problem) {
            return res.status(404).json({ error: 'Problem not found' });
        }
        
        res.json(selected_problem);
        console.log("fetched", selected_problem)
    } catch (error) {
        console.error('LeetCode API error:', error);
        res.status(500).json({ 
            error: 'Failed to fetch problem',
            details: error.message 
        });
    }
});



server.listen(PORT, () => {
    console.log("Server running on port 3000")
});