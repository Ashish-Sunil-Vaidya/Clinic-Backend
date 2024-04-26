import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import userRouter from "./routes/user.routes.js"
import receiptionistRouter from "./routes/receiptionist.routes.js"
import doctorRouter from "./routes/doctor.routes.js"

import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import postmanToOpenApi from "postman-to-openapi";

const app = express()

import { openapi } from "../openapi.js"


const corsOptions = {
    origin: function (origin, callback) {

        const whitelist = [process.env.CORS_ORIGIN]
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,  // Allow cookies to be sent with requests
};

app.use(cors(corsOptions));


app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

app.use(cookieParser());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/users/receptionist", receiptionistRouter);
app.use("/api/v1/users/doctor", doctorRouter);


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapi));

app.get('/swagger-json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerJson);
});

app.get('/generate-yml', async (req, res) => {
    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // Postman Collection Path
    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    const postmanCollection = 'collection.json'
    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // Output OpenAPI Path
    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    const outputFile = 'collection.yml'
    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // Async/await
    ////++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    try {
        const result = await postmanToOpenApi(postmanCollection, outputFile, {
            defaultTag: 'General'
        })
        //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        // Without save the result in a file
        //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        const result2 = await postmanToOpenApi(postmanCollection, null, {
            defaultTag: 'General'
        })
        console.log(`OpenAPI specs: ${result}`)
    } catch (err) {
        console.log(err)
    }
});
app.get('/', (req, res) => {
    res.send("Welcome to backend of clinic management system developed by --Syed Waseem(Code Surgery Squad)");
})
export { app }

