const mongoose =require('mongoose')
const {ObjectId} = mongoose.Schema.Types

const employeeSchema = new mongoose.Schema({
    firstname:{
        type:String
    },
    middlename:{
        type:String
    },
    lastname:{
        type:String
    },
    age:{
        type:Number
    },
    designation:{
        type:String
    },
    projects:[{
        type:ObjectId,
        ref:"Project"
    }]
})
var Employee =mongoose.model("Employee",employeeSchema)
module.exports = {Employee,employeeSchema}