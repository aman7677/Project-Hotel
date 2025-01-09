const express = require ("express");
const mysql = require ("mysql2");
const bodyparser = require("body-parser");
const cors = require("cors");
const {body, validationResult}= require("express-validator");

const app = express();

const port = 6000;
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));

//connection
const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "aman7677",
    port: 3306,
    database: "hotel_db"
});

//connect to the first database
db.connect((err) =>{
    if (err){
        console.error("Error connecting:", err.stack);
        return;
    }
    console.log("connected as id", db.threadId);
});

//route to get booking details
app.get("/booking",(req,res) =>{
    const colBooking = "SELECT Booking_ID,FullName,Email,Contact,CheckInDate,CheckOutDate,NoOfGuest,RoomType,IdentityProof FROM booking";
    db.query(colBooking,(err,results) =>{
        if(err){
            return res.status(500).json({error:"Database query failed."});
        }
        res.json(results);
    });
});

//route to get customer details by ID
app.get("/booking/:ID",(req,res) =>{
    const {ID} = req.params;
    const colBooking = "SELECT Booking_ID,FullName,Email,Contact,CheckInDate,CheckOutDate,NoOfGuest,RoomType,IdentityProof FROM booking WHERE BookingID = ?";
    db.query(colBooking,[ID],(err,result) =>{
        if(err){
            return res.status(500).json({
                message:"Database error",error:err});
        }
        if (result.length === 0){
            return res.status(404).json({message:"Booking Details not found"});

        }
        res.status(200).json({Booking:result[0]});
    });
});

//route to add Booking (post request)
app.post("/addbooking",(req, res) => {
    const {
        FullName,
        Email,
        Contact,
        CheckInDate,
        CheckOutDate,
        NoOfGuest,
        IdentityProof
    } = req.body;
    const error = [];
    
    //Basic Validation
    if (!FullName)
        error.push({field : "FullName", message : "FullName is required"});
    if (!Email)
        error.push({field:"Email", message :"Email is required"});
    if (!Contact)
        error.push({field:"Contact", message : "Contact number is required"});
    if (!CheckInDate)
        error.push({field:"CheckInDate", message :"CheckInDate is required"});
    if (!CheckOutDate)
        error.push({field:"CheckOutDate", message :"CheckOutDate is required"});
    if (!NoOfGuest)
        error.push({field:"NoOfGuest", message :"NoOfGuest is required"});
    if (!IdentityProof)
        error.push({field:"IdentityProof", message :"IdentityProof is required"});
    if (error.length > 0) {
        return res.status(400).json({error});
    }
    const query = `INSERT INTO booking (FullName, Email, Contact,CheckInDate,CheckOutDate,NoOfGuest,IdentityProof) VALUES (?,?,?,?,?,?,?)`;
    db.query(
        query,[FullName,Email,Contact,CheckInDate,CheckOutDate,NoOfGuest,IdentityProof],(err,result) => {
            if (err) {
                return res.status(500).json({message : "Database error",error:err});
            }
            res.status(200).json({
                message: "Booking Details added Successfully",
                BookingID: result.insertId,
            });
        }
    );
});


//start the server
app.listen(port,()=>{
    console.log(`server is running on http://localhost:${port}`);

});