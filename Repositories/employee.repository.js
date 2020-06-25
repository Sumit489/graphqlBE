const { Mongoose } = require("mongoose");

const mongoose = require('mongoose');
const Employee = mongoose.model("Employee")


class employeeRepository{
    addEmployee(datas,callback){
        const newEmployee = new Employee(datas)
        newEmployee.save(callback)
    }

    getEmployeebyid(empid,callback){
        Employee.findById(empid,callback)
    }

    getEmployee(callback){
        Employee.find(callback)
    }

    updateEmployee(empid,req,callback){
        Employee.findByIdAndUpdate({_id:empid},{$set:req.body},{new:true, useFindAndModify:false},callback)
    }

    deleteEmployee(empid,callback){
        Employee.findByIdAndDelete(empid,callback)
    }

    graphqlgetEmployees(){
        return Employee.find({}).populate("projects","name description startdate enddate") 
    }

    graphqlgetEmployee(args){
        return Employee.findById(args.id).populate("projects","name description startdate enddate")
    }

    graphqlgetProjects(){
        return Project.find({})
    }

    graphqlgetProject(args){
        return Project.findById(args.id)
    }

}

module.exports = employeeRepository