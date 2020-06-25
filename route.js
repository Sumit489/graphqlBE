const express = require('express')
const router = express.Router()
const employeeController = require('./Controllers/employee.controller')

const employeecontroller = new employeeController();

router.post('/register',(req,res)=>{
    employeecontroller.addEmployee(req,res);
});

router.get('/employee/:empid',(req,res)=>{
    employeecontroller.getEmployeebyid(req,res);
})

router.get('/employee',(req,res)=>{
    employeecontroller.getEmployee(req,res);
})

router.put('/updateEmployee/:empid',(req,res)=>{
    employeecontroller.updateEmployee(req,res);
})

router.delete('/deleteEmployee/:empid',(req,res)=>{
    employeecontroller.deleteEmployee(req,res);
})

module.exports = router