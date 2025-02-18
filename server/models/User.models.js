import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    image: {
        type : String
    },
    username:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: Number,
        required : true
    },
    bio : {
        type: String
    },
    password:{
        type: String,
        required: true
    }
}, {timestamps: true})

const User = mongoose.model('User', UserSchema);
export default User;