"use strict";

//Import DB config 
const db = require('../DB/config.js');


/*
 * Gets All Users From Table
 * Returns a promise with Users Data if Found in Database.
 */

const GetAllUsers = () => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM `tbl_users` ORDER BY id", function (err, rows, fields) {
            if (err) {
                console.log("error-->",err);
                reject(err);
            }
            if (rows.length > 0) {
                console.log("Users Found!");
                resolve(rows);
            } else {
                const error = "Not Found";
                console.log("Data Not Found");
                resolve(error);
            }
        });

    });

}

const GetUsers = (username) => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM `tbl_users` where name = ? LIMIT 1",[username],function (err, rows, fields) {
            if (err) {
                console.log("error-->",err);
                reject(err);
            }
            if (rows.length > 0) {
                console.log("Users Found!");
                resolve(rows);
            } else {
                const error = "Not Found";
                console.log("Data Not Found");
                resolve(error);
            }
        });

    });

}


const AddUser = (username) => {
    return new Promise((resolve, reject) => {
        db.query("INSERT INTO `tbl_users` (`name`) VALUES ( ?)",
            [username], function (err, rows, fields) {
                if (err) {
                    reject(err);
                    throw err;
                }
                else if(rows.affectedRows > 0) {
                    console.log(rows)
                    console.log("User Added Successfully");
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


//Exports
module.exports = {
    GetAllUsers,
    GetUsers,
    AddUser
}