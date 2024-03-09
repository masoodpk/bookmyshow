import mongoose from "mongoose";

const schema = new mongoose.Schema({
    username:{
    type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    profile:{
        type:String
    }
});

export default mongoose.model.Logins || mongoose.model("Login",schema);