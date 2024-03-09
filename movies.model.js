import mongoose from "mongoose";

const schema = new mongoose.Schema({
    profile:{
    type:String
    },
    title:{
        type:String
    },

    description:{
        type:String
    },
   
});

export default mongoose.model.Movies || mongoose.model("Movie",schema);