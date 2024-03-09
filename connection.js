import mongoose from "mongoose";

function conn(){
    return mongoose.connect(process.env.DB_URI);

}
export default conn;