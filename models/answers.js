"use strict";

//Import DB config 
const db = require('../DB/config.js');


const AddAnswer = (username, answer1, answer2) => {
    return new Promise((resolve, reject) => {
        const strAnswer = JSON.stringify(answer2);
        db.query("INSERT INTO `tbl_answers` (`user_id`, `answer1`, `answer2`) VALUES ( ?, ?, ?);",
            [username,answer1,strAnswer], function (err, rows, fields) {
                if (err) {
                    console.log(err);
                    reject(err);
                    throw err;
                }
                else if(rows.affectedRows > 0) {
                    console.log("Answer Added Successfully");
                    var status = {success:true};
                    resolve(status);
                } else {
                    console.log("Error Inserting Record");
                    var status = {success:false};
                    resolve(status);
                }
            });
    })

}


const GetSummary = (username) => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM `tbl_answers` where user_id = ? LIMIT 1",[username],function (err, rows, fields) {
            if (err) {
                console.log("error-->",err);
                reject(err);
            }
            if (rows.length > 0) {
                console.log("Answers Found!");
                resolve(rows);
            } else {
                const error = "Not Found";
                console.log("Data Not Found");
                resolve(error);
            }
        });

    });

}

const GetAllAnswers = () => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM `tbl_answers`",function (err, rows, fields) {
            if (err) {
                console.log("error-->",err);
                reject(err);
            }
            if (rows.length > 0) {
                console.log("Answers Found!");
                resolve(rows);
            } else {
                const error = "Not Found";
                console.log("Data Not Found");
                resolve(error);
            }
        });

    });

}


//Exports
module.exports = {
AddAnswer,
GetSummary,
GetAllAnswers
}