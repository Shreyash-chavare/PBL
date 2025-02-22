import userModel from '../models/usermodel.js';
import tokenuser from '../utils/usertoken.js';
import bcrypt from 'bcrypt';

const userlog = async (req, res) => {
    try {
        let { Email, password } = req.body;
        const IsUser = await userModel.findOne({ Email });
        console.log(IsUser.Email);
        
        if (IsUser) {
            const userauthenticate = await bcrypt.compare(password, IsUser.password);
            if (userauthenticate) {
                const token = tokenuser(IsUser); 
                res.cookie("user-token", token);
                req.session.user = IsUser;
                console.log("Login successfully");
                res.redirect('/home')

            } else {
                return res.status(401).send("Something went wrong");
            }
        } else {
            return res.status(404).send("User not found");
        }
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).send("Something went wrong");
    }
};

export default userlog;
