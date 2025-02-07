import jwt from 'jsonwebtoken';
import userModel from '../models/usermodel.js';

const isLoggedIn = async (req, res, next) => {
    try {
        const token = req.cookies["user-token"];
        if (!token) {
            return res.status(401).send("Access denied. No token provided.");
        }
        const decoded = jwt.verify(token, process.env.JWT_TOKEN);  
        const user = await userModel.findById(decoded.id);

        if (!user) {
            return res.status(404).send("User not found.");
        }
        req.user = user;
        next();
    } catch (err) {
        console.error(err);
        res.status(401).send("Invalid token");
    }
};

export default isLoggedIn;
