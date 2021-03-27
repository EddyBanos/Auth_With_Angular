const express = require('express');
const router = express.Router();
const UserModel= require('../models/UserModel');
const bcryptjs =require('bcryptjs');
const webToken = require("jsonwebtoken");

require("dotenv").config();

// REGISTRER API

router.post("/signup",(req,res)=>{
    const {user, pass, mail} = req.body;
    if(user == undefined || user == null ||
        pass == undefined ||pass == null ||
        mail == undefined ||mail == null ){
            res.status(401).json({
                message: "Ingresa todos los datos",
                status: res.statusCode
            });
        }else {
            //Check if email already exists on db using the model
            UserModel.findOne ({
                attributes:["user"],
                where:{
                    mail
                }
            }).then((value)=>{
                if (value === null){
                    //if no data found create a new record in db with hashed pass
                    bcryptjs.genSalt(10,function (err,salt){
                        bcryptjs.hash(pass,salt,(err,hash)=>{
                            UserModel.create({
                                //create record
                                user:user,
                                mail:mail,
                                pass:hash
                            }).then ((value)=>{
                                res.status(201).json({
                                    message:"Cuenta creada",
                                    status:res.statusCode
                                })
                                }).catch(err => res.status(404).json({message:"Ocurrio un error",err}))
                            })
                        })
                    }else{
                        res.status(401).json({
                            message:"Este correo ya se encuentra registrado",
                            status:res.statusCode
                        });
                    }
                })

            }
        })

        //Login API
        router.post("/login", (req,res)=>{
            const {user, pass} = req.body;
    if(user == undefined || user == null ||
        pass == undefined ||pass == null  ){
            res.status(401).json({
                message: "Ingresa todos los datos",
                status: res.statusCode
            });
        }else {
            //Check if email already exists on db using the model
            UserModel.findOne ({
                where:{
                    user
                }
            }).then((value)=>{
                if (value === null){
                    //if no data found ask to register
                    res.status(401).json({
                        message:"Usuario no encontrado! Por favor registrate",
                        stattus: res.statusCode,
                        token
                    })
                    }else{
                        //If the mail is there, check if pass is correct
                        const dbUserPass = value.getDataValue("pass");

                        bcryptjs.compare(pass,dbUserPass, function(err,result){
                            if(result){
                                //if pass correct, sent json webtoken

                                const userdetail={
                                name:value.getDataValue("user"),
                                id:value.getDataValue("id")
                            }
                            const token = webToken.sign(userdetail,process.env.secret_key, {expiresIn:"60s"})

                            res.status(200).json({
                                message: "Bienvenido!",
                                status: res.statusCode,
                                token
                            })
                            }else{
                                //If password not match sent error message
                                res.status(404).json({
                                    message: "Password incorrect",
                                    status: res.statusCode,
                                    token:""
                                })
                            }
                        })
                    }
                })

            }
        });


module.exports = router