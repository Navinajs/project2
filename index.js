import express from "express";
import { router } from "./route.js";
const app=express();

app.use(express.json());

app.use(router);

const port=2000;
//Starts the server listen
app.listen(port,()=>{
    console.log(`Connected to http://localhost:${port}`);
})