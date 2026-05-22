
//fields->attributes
const mongoose = require("mongoose");


const databaseSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    date: { type: Date, default: Date.now },
        role:{
        type:String,
        required:true,
        default:"NORMAL",
    }
}, {timestamps: true});

const db = mongoose.model("dbser", databaseSchema);
module.exports = db;

