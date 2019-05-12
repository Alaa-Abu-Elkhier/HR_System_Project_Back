const Joi = require('joi');
const mongoose= require('mongoose');

const employeeSchema= new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            minlength:4,
            maxlength:50
        },
        department:String,
        project:String,
        salary:String,
        e_mail:{
            type:String,
            unique:true
        },
        password:{
            type:String,
            required: true,
            minlength:8,
            maxlength:50
        },
        position:String


});

const Employee =mongoose.model('employee', employeeSchema)

function validateEmployee(employee){
    const schema ={
        name:Joi.string().min(4).max(50).required(),
        e_mail:Joi.string().required().email(),
        password:Joi.string().min(8).max(50).required(),
        department:Joi.string().required(),
        position:Joi.string().required(),
        project:Joi.string().required(),
        salary:Joi.string().required(),
      
       
        
        
     };
    return Joi.validate(employee, schema);
}

module.exports.Employee=Employee;
module.exports.validateEmployee=validateEmployee;