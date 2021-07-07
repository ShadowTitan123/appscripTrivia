"use strict";

const express = require('express');
const router = express.Router();
const { GetAllUsers , GetUsers , AddUser } = require('../models/users.js');
const db = require('../DB/config.js');


router.get('/GetAllUserInformation', async (req, res) => {
    try{
        console.log("Entry to User Controller");
        const GetAllUser = await GetAllUsers();
        if(GetAllUser != null && GetAllUser != 'Not Found' && GetAllUser != ''){
            res.status(200).json(GetAllUser);
        }else{
            res.status(200).json({message:"Data Not Found"})
        }
        console.log("Exiting From User Controller");
    }
    catch(err){
        console.log("Error in User Controller",err);
        res.status(500).json(err);
    }
});


router.get('/GetSingleUserInformation/:username', async (req, res) => {
    try{
        console.log("Entry to User Controller");
        const username = req.params.username;
        const GetUser = await GetUsers(username);
        if(GetUser != null && GetUser != 'Not Found' && GetUser != ''){
            res.status(200).json({success:true,GetUser});
        }else{
            res.status(200).json({success : false,message:"Data Not Found"})
        }
        console.log("Exiting From GetAllUser Controller");
    }
    catch(err){
        console.log("Error in GetAllUser Controller",err);
        res.status(500).json(err);
    }
});



router.get('/GetAllUsers', async (req, res) => {

    try{
        const GetAllUser = await GetAllUsers();
        if(GetAllUser != null && GetAllUser != 'Not Found' && GetAllUser != ''){
            console.log("<------------------------------->");
            res.status(200).json(GetAllUser);
        }else{
            res.status(200).json({"message":"Data Not Found"})
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json(err);
    }


});



router.post('/AddUser', async (req, res) => {
    try {
        const AddNewUser = await AddUser(req.body.name);
        if (AddNewUser.success === true) {
            console.log("User Details Inserted into DB");
            console.log("<------------------------------->");
            res.status(200).json({ message : "User Added successfully", success:true });
        } else {
            console.log("Data Failed to Insert in DB");
            res.status(500).json({ message : "Error Inserting Data",success:false });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);  
    }
});


module.exports = router;
   