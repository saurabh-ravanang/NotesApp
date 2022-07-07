const mongoose = require("mongoose");

const mongoURI = "mongodb://localhost:27017/saurabhnotes?readPreference=primary&appname=MongoDB%20Compass&ssl=false"

const connectTOMongo = ()=>{
    mongoose.connect(mongoURI, ()=>{
        console.log('connect to mongo succesfully...');
    })
}

module.exports = connectTOMongo;