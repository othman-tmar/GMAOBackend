const mongoose = require('mongoose')




const departmentSchema = new mongoose.Schema({
 
    nameDepartment: {
        type: String,
        required: true,
    },

    responsible: {
        type: String,
        required: true,
    },
    nbMachine: {
        type: Number,
        default: 1,
        required: true,
    },
    cost: {
        type: Number,
        required: false,
    },
    
    imageDepartment: {
        type: String,
        required: false
    },

},
    {
        timestamps: true,
    },
    )
   /*  adminSchema.pre('save', async function (next) {
        if (!this.isModified('password')) return next()
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(this.password, salt)
        this.password = hashedPassword
        next()
    }) */

 

module.exports = mongoose.model('Department', departmentSchema)