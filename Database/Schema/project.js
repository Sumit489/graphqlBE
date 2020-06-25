const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
    name:{
        type:String
    },
    description:{
        type:String
    },
    startdate:{
        type:String
    },
    enddate:{
        type:String
    }
})

var Project = mongoose.model("Project",projectSchema)
module.exports = {Project,projectSchema}