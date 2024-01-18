const mongoose  = require("mongoose");
const express = require('express')

mongoose.connect(process.env.DBConnectionURL).then(()=> {
   console.log('connected to db')
}).catch(err => console.log(err.message))