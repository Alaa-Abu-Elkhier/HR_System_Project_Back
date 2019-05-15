const mongoose= require('mongoose');
const jwt = require('jsonwebtoken');
const express= require ('express');
const router = express.Router();
const _ = require("lodash");
const Joi = require('joi');
const bcrypt = require("bcrypt");
const {Employee, validateEmployee} = require('../models/employee');



router.post('/', async(req, res) => {
    const {error} =validateLogin(req.body);
    console.log("Entered backend")
    if (error) return res.status(400).send(error.details[0].message);
    console.log("valid password")
    const employee= await Employee.findOne({e_mail:req.body.e_mail});
    if(!employee) return res.status(400).send('invalid E-mail or password1');
    console.log("valid E-mail");
    const validPassword = await bcrypt.compare(req.body.password,employee.password);
    if(!validPassword) return res.status(400).send('invalid E-mail or password2');
    console.log("True")
    const token = jwt.sign({_id: employee._id},'privateKey');
    res.send(token)
});




function validateLogin(employee){
    const schema ={
        e_mail:Joi.string().min(8).max(255).required().email(),
        password:Joi.string().min(8).max(255).required()
        
     };
    return Joi.validate(employee,schema);
}


module.exports = router;