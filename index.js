import dotenv from "dotenv"
import { app } from "./src/app.js"
import connectToDb from "./src/db/index.js"

dotenv.config({
    path: "./env"
})

connectToDb()
.then(() => {
    app.on("Error", () => {
        console.log("Error in communication between server and Db");
    })

    app.listen(process.env.PORT || 8000, () => {
        console.log("Server running at port", process.env.PORT);
    })
    
})
.catch((error) => {
    console.log("Connection failed at index.js", error);
})