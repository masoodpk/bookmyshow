import express from "express"
import router from "./router.js";
import conn from "./connection.js";

import dotenv from "dotenv";

const app = express()
app.use(express.json({limit:"50mb"}))
app.use( express.static("./static"))
app.use("/api",router);


dotenv.config();

conn().then(() => {
    app.listen(process.env.PORT,(error) =>{
        if(error){
            console.log(error);
        }
        console.log(`Server started on port ${process.env.PORT}`);

    })

})
.catch(error=>{
console.log(error);
})