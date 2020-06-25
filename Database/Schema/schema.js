const {gql} = require('apollo-server-express')
const { Mongoose } = require('mongoose')
const Employee = require('./employee').Employee


 const typeDefs = gql `
    type Employee{
        id:ID!
        firstname:String
        middlename:String
        lastname:String
        age:Int
        designation:String
    }

    type Query{
        getEmployee:[Employee]
        getEmployee(id:ID!):Employee
    }

    type Mutation{
        addEmployee(firstname:String,middlename:String,lastname:String,age:Int,designation:String):Employee
        updateEmployee(firstname:String,middlename:String,lastname:String,age:Int,designation:String):Employee
        deleteEmployee(id:ID!):Employee
    }

`

 const resolvers = {
    Query:{
        getEmployee:(parent,args)=>{
            return Employee.find({})
        },
        getEmployee:(parent,args)=>{
            return Employee.findById(args.id)
        }
    },
    Mutation:{
        addEmployee:(parent,args)=>{
            let employee= new Employee({
                firstname:args.firstname,
                lastname:args.lastname,
                middlename:args.middlename,
                age:args.age,
                designation:args.designation
            });
            return employee.save();
        },
        updateEmployee:(parent,args)=>{
            if (!args.id) return;
            return Employee.findOneAndUpdate(
                {
                    _id:args.id
                },
                {
                    $set:{
                        firstname:args.firstname,
                        lastname:args.lastname,
                        middlename:args.middlename,
                        age:args.age,
                        designation:args.designation
                    }
                },
                {new:true},(err,Employee)=>{
                    if(err){
                        console.log("wrong in update")
                    }
                }
                
            );
        }
    }
}

module.exports = typeDefs,resolvers