const employerepo = require("../Repositories/employee.repository")
const mongoose = require('mongoose');
const Employee = mongoose.model("Employee")
class employeeController{
    constructor(){
        this.employerepo = new employerepo()
    }

    addEmployee(req,res){
        const {firstname,middlename,lastname,age,designation} = req.body;
        
        let newEmployee = new Employee({firstname,middlename,lastname,age,designation})
        this.employerepo.addEmployee(
            newEmployee,
            (err,data)=>{
                if(err){
                    res.json({success:false,msg:"failed to save employee" +err })
                }
                else{
                    res.json({success:true,msg:"employee registered"})
                }
            }
        )

    }

    getEmployeebyid(req,res){
        let empid = req.params.empid
        this.employerepo.getEmployeebyid(empid,(err,data)=>{
            if(err){
                    res.json({success:false,msg:"failed to save employee" +err })
            }
            else{
                    res.json({success:true,data:data})
             }
        })
    }

    getEmployee(req,res){
        this.employerepo.getEmployee((err,data)=>{
            if(err){
                res.json({success:false,msg:"failed to save employee" +err })
        }
        else{
                res.json({success:true,data:data})
         }
        })
    }

    updateEmployee(req,res){
        let id = req.params.empid
        this.employerepo.updateEmployee(id,req,(err,data)=>{
            if(err){
                res.json({success:false,msg:"failed to save employee" +err })
        }
        else{
                res.json({success:true,data:data})
         }
        })
    }

    deleteEmployee(req,res){
        let empid=req.params.empid
        this.employerepo.deleteEmployee(empid,(err,data)=>{
            if(err){
                res.json({success:false,msg:"failed to save employee" +err })
            }
            else{
                res.json({success:true,data:data})
            }
        })
    }


}

module.exports = employeeController;