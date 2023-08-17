const mongoose = require('mongoose')
const Department =require("./department.js");
const bcrypt = require('bcrypt') // crypte psw


const machineSchema = new mongoose.Schema({
    referenceMachine: {
        type: String,
        required: true,
        unique: true
    },
    nameMachine: {
        type: String,
        required: true,
    },
    departmentID: {type:mongoose.Schema.Types.ObjectId,
        ref:Department},

 
    productionTime: {
        type: Number,
        required: true,
    },
    nbPreMainInWeek: {
        type: Number,
        default: 1,
        required: true,
    },
    breakTime: {
        type: Number,
        default:0,
        required: true,
    },
    cost: {
        type: Number,
        default:0,
        required: true,
    },

    image: {
        type: String,
        default: "testimage",
        required: false
    },

},
    {
        timestamps: true,
    },
    )

 

module.exports = mongoose.model('Machine', machineSchema)