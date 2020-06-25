const express = require("express")
const employerepo = require("../Repositories/employee.repository")
const app =express()
const mongoose = require("mongoose")
const port = 5000;
const {gql} = require('apollo-server-express')
const URI = "mongodb+srv://sumit:27v2fxIUZ3CTTS4M@cluster0-xmxjn.mongodb.net/test?retryWrites=true&w=majority"
const bodyParser = require('body-parser');
const cors = require('cors')
const {ApolloServer} = require('apollo-server-express');
const Employee = require('./Database/Schema/employee').Employee
const Project = require('./Database/Schema/project').Project
class Server{
    constructor(){
        this.initDB();
        // this.initRoutes();
        // this.start();
        this.employerepo = new employerepo
    }

    start(){
        
    }
    initRoutes(){
        app.get('/',function(req,res){
            res.send(employeename)
        })
    }

    initDB(){
        mongoose.connect(URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        })
        
        mongoose.connection.on('connected',()=>{
            console.log("connected to mongo")
        })
        require('./Database/Schema/employee')
        app.use(express.json())
        app.use(require('./route'))
        const server = new ApolloServer({
            typeDefs:gql `
            type Employee{
                id:ID!
                firstname:String
                middlename:String
                lastname:String
                age:Int
                designation:String
                projects:[Project]
            }
            type Project{
                id:ID!
                name:String
                description:String
                startdate:String
                enddate:String
            }
        
            type Query{
                getEmployees:[Employee]
                getEmployee(id:ID!):Employee
                getProjects:[Project]
                getProject(id:ID!):Project
            }
        
            type Mutation{
                addEmployee(firstname:String,middlename:String,lastname:String,age:Int,designation:String,projects:[ID]):Employee
                updateEmployee(id:ID!,firstname:String,middlename:String,lastname:String,age:Int,designation:String,projects:[ID]):Employee
                deleteEmployee(id:ID!):Employee
                addProject(name:String,description:String,startdate:String,enddate:String):Project
                updateProject(id:ID!,name:String,description:String,startdate:String,enddate:String):Project
                deleteProject(id:ID!):Project
            }
        
        `,
            resolvers: {
                Query:{
                    getEmployees:(parent,args)=>{
                        employerepo.graphqlgetEmployees()
                    },
                    getEmployee:(parent,args)=>{
                        employerepo.graphqlgetEmployee(args)
                    },
                    getProjects:(parent,args)=>{
                        employerepo.graphqlgetProjects()
                    },
                    getProject:(parent,args)=>{
                        employerepo.graphqlgetProject(args)
                    }
                },
                Mutation:{
                    addEmployee:(parent,args)=>{
                        let employee= new Employee({
                            firstname:args.firstname,
                            lastname:args.lastname,
                            middlename:args.middlename,
                            age:args.age,
                            designation:args.designation,
                            projects:args.projects
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
                                    designation:args.designation,
                                    projects:args.projects
                                }
                            },
                            {new:true},(err,Employee)=>{
                                if(err){
                                    console.log("wrong in update")
                                }
                            }
                            
                        );
                    },
                    deleteEmployee:(parent,args)=>{
                        if(!args.id) return
                        return Employee.findByIdAndDelete(args.id)
                    },
                    addProject:(parent,args)=>{
                        let project= new Project({
                            name:args.name,
                            description:args.description,
                            startdate:args.startdate,
                            enddate:args.enddate
                        });
                        return project.save();
                    },
                    updateProject:(parent,args)=>{
                        if (!args.id) return;
                        return Project.findOneAndUpdate(
                            {
                                _id:args.id
                            },
                            {
                                $set:{
                                    name:args.name,
                                    description:args.description,
                                    startdate:args.startdate,
                                    enddate:args.enddate
                                }
                            },
                            {new:true},(err,Project)=>{
                                if(err){
                                    console.log("wrong in update")
                                }
                            }
                            
                        );
                    },
                    deleteProject:(parent,args)=>{
                        if(!args.id) return
                        return Project.findByIdAndDelete(args.id)
                    },
                }
            }
        })
        app.use(bodyParser.json());
        app.use('*',cors());
        server.applyMiddleware({app})
        app.listen(port,()=>{
            console.log(`app is running at http://localhost:5000${server.graphqlPath}`)
        })
    }
}

new Server()
