const express= require('express');
const bodyParse = require('body-parser');
const db = require('./connection/db');
const path = require('path');
const cors = require ('cors');
const { Console } = require('console');

//database connection

db.authenticate()
.then (()=>{
    console.log('Conetado a la bd');
})
.catch((err)=>{
    console.log('No se conecto',err);
})

const app = express ();
app.use(cors());

//use public folder to serve web pages

app.use(express.static(path.join(__dirname,"public")))

//parse application/json & form-urlencoded
app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: true}));


app.listen(process.eventNames.PORT || 3000, ()=> console.log("Server running on port 3000") );

//api routes

app.use("/api/user",require('./api/user'));

app.get("/", (req,res)=>{
    res.sendFile(path.join(__dirname,"public/index.html"))
})