import mongoose from "mongoose";

const userSchema=mongoose.Schema({
    fullname: {
        type: String,
        minlength: 3,
        trim: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    Email: {
        type: String,
        required: true,
        unique: true,
    }

}
);
const user=mongoose.model("user",userSchema);
export default user;