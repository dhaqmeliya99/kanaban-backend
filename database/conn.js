const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
mongoose.connect("mongodb://0.0.0.0:27017/kanabanbackend")
    .then(() => {
        console.log("=================================================");
        console.log("DATABASE CONNECTED SUCCESSFULLY");
        console.log("=================================================");
    }).catch((err) => {
        console.log("=================================================");
        console.log("DATABASE NOT CONNECTED", err);
        console.log("=================================================");
    });   