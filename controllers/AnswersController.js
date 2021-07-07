"use strict";

const express = require('express');
const router = express.Router();
const { AddAnswer , GetSummary, GetAllAnswers} = require('../models/answers.js');
const db = require('../DB/config.js');


router.post('/AddAnswer', async (req, res) => {
    try {
        const AddAnswers = await AddAnswer(req.body.username,req.body.answer1,req.body.answer2);
        if (AddAnswers.success === true) {
            console.log("Answers Inserted into DB");
            res.status(200).json({ message : "Answers Added successfully", success:true });
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

router.get('/GetSummaryByUserID/:username', async (req, res) => {
    try{
        console.log("Entry to Answers Controller");
        const username = req.params.username;
        const GetSummaryData = await GetSummary(username);
        if(GetSummaryData != null && GetSummaryData != 'Not Found' && GetSummaryData != ''){
            res.status(200).json({success:true,GetSummaryData});
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

router.get('/GetAllAnswers', async (req, res) => {
    try{
        console.log("Entry to Answers Controller");
        const username = req.params.username;
        const GetAllAnswer = await GetAllAnswers();
        if(GetAllAnswer != null && GetAllAnswer != 'Not Found' && GetAllAnswer != ''){
            res.status(200).json({success:true,GetAllAnswer});
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






module.exports = router;
   