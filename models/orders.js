"use strict";

//Import DB config 
const db = require('../DB/config.js');

/*
 * Create a New order and Inserts into Table
 * Returns a promise with status true/false after insertion.
 */

const CreateOrder = (firstName, LastName, Email, Address, Address2, Country, State, Zip, CardName, CreditCard, Expiration, CVV,id,sessionUser) => {
    return new Promise((resolve, reject) => {
        var val = Math.floor(1000 + Math.random() * 9000);
        db.query("INSERT INTO `tbl_orders` (`product_id`, `firstName`, `LastName`, `Email`, `Address`, `Address2`, `Country`, `State`, `Zip`, `CardName`, `CreditCard`, `Expiration`, `CVV`, `session_user`,`status`,`order_id`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
            [id,firstName,LastName, Email, Address, Address2, Country, State, Zip, CardName, CreditCard, Expiration, CVV, sessionUser,0,val], function (err, rows, fields) {
                if (err) {
                    reject(err);
                    throw err;
                }
                else if(rows.affectedRows > 0) {
                    console.log("Order Placed Successfully");
                    var status = {status:true , orderId : val};
                    resolve(status);
                } else {
                    console.log("Error Inserting Record");
                    var status = {status:false , orderId : val};
                    resolve(status);
                }
            });
    })

}


const GetOrderById = (id) => {
    return new Promise((resolve, reject) => {
        db.query("SELECT t1.id,t1.order_id,t1.product_id,t1.firstName,t1.LastName,t1.Email,t1.Address,t1.Address2,t1.Country,t1.State,t1.Zip,t2.product_name ,t2.product_type,t2.product_price from tbl_orders t1 INNER join tbl_products t2 ON t1.product_id = t2.id WHERE t1.order_id = ?",[id] ,function (err, rows, fields) {
            if (err) {
                reject(err);
                throw err;
            }
            if (rows.length > 0) {
                console.log("Order Found!");
                resolve(rows);
            } else {
                const error = "Not Found";
                console.log("Data Not Found");
                resolve(error);
            }
        });

    });

}


const ConfirmOrder = (id,User) => {
    return new Promise((resolve, reject) => {
        db.query("Update tbl_orders SET status = ? WHERE order_id = ?",
            [1,id], function (err, rows, fields) {
                if (err) {
                    reject(err);
                    throw err;
                }
                else if(rows.affectedRows > 0) {
                    console.log("Order Confirmed Successfully");
                    var status = {status:true};
                    resolve(status);
                } else {
                    console.log("Error Inserting Record");
                    var status = {status:false};
                    resolve(status);
                }
            });
    })

}

const GetAllOrder = () => {
    return new Promise((resolve, reject) => {
        db.query("SELECT t1.id,t1.order_id,t1.product_id,t1.firstName,t1.LastName,t1.Email,t1.Address,t1.Address2,t1.Country,t1.State,t1.session_user,t1.created_Date,t1.Zip,t2.product_name ,t2.product_type,t2.product_price from tbl_orders t1 INNER join tbl_products t2 ON t1.product_id = t2.id WHERE t1.status = 1" ,function (err, rows, fields) {
            if (err) {
                reject(err);
                throw err;
            }
            if (rows.length > 0) {
                console.log("Orders Found!");
                resolve(rows);
            } else {
                const error = "Not Found";
                console.log("Data Not Found");
                resolve(error);
            }
        });

    });

}


const DeleteOrder = (id) => {
    return new Promise((resolve, reject) => {
        db.query("DELETE FROM `tbl_orders` WHERE `tbl_orders`.`id` = ?",
            [id], function (err, rows, fields) {
                if (err) {
                    reject(err);
                    throw err;
                }
                else if(rows.affectedRows > 0) {
                    console.log("Order Deleted Successfully");
                    var status = {status:true};
                    resolve(status);
                } else {
                    console.log("Error Deleting Record");
                    var status = {status:false};
                    resolve(status);
                }
            });
    })

}


module.exports = {
    CreateOrder,
    GetOrderById,
    ConfirmOrder,
    GetAllOrder,
    DeleteOrder
}