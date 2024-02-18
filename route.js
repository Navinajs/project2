import express from "express";
import {create,update,read,del,mid,createTable, insertTable, selectId, deleteId, insert_data, selectedID}  from "./controller.js";
import bodyParser from 'body-parser';

//exporting router
export const router = express.Router();
router.use(bodyParser.json());

//call postAPI
router.post("/create/:id1/:id2",mid,create);

//call getAPI
router.get("/read",mid,read);

//call putAPI
router.put("/update",mid,update);

//call deleteAPI
router.delete("/delete",mid,del);

//createTable api
router.post("/createtable",createTable);

//insertTable api
router.put("/inserttable",insertTable);

//selectid api
router.get("/select/:id",selectId);

//deleteId api
router.delete("/delete/:id",deleteId);

//dynamic insert of data
router.post("/insertdata",insert_data);

//dynamic selection of data
router.get("/selectdata/:id",selectedID);


