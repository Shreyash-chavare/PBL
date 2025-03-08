import userModel from '../models/usermodel.js';
import tokenuser from '../utils/usertoken.js';
import bcrypt from 'bcryptjs';

const userlog = async (req, res) => {
    try {
        let { email, password } = req.body;
        console.log(req.body)
        let Email = email 

        const IsUser = await userModel.findOne({ Email });

        if (!IsUser) {
            return res.status(404).json({ error: "User not found" });
        }
        
        if (IsUser) {
            const userauthenticate = await bcrypt.compare(password, IsUser.password);
            if (userauthenticate) {
                const token = tokenuser(IsUser); 
                res.cookie("user-token", token);
                req.session.user = IsUser;
                console.log("Login successfully");
                res.json({ success: true, message: "Login successful" });

            } else {
                return res.status(401).json("Something went wrong IsUser is false");
            }
        } else {
            return res.status(404).json("User not found");
        }
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json("Something went wrong");
    }
};

export default userlog;
