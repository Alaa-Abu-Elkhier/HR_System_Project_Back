
const mongoose = require('mongoose'); 
const employeeSchema = new mongoose.Schema(
    {   
    name: String,  
    Department: String,
    age:Number,
    position:String,
   
 }) 

 const Employee = mongoose.model('employeess',employeeSchema ) 
 module.exports=Employee