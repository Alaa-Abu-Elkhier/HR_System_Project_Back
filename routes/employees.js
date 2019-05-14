const mongoose= require('mongoose');
const express = require('express');
const {Employee, validateEmployee} = require('../models/employee');  //exported file
const router = express.Router();

//all employees
router.get('/', async(req ,res) => {
    const employees= await Employee.find().sort('name');
    res.send(employees);
});

// router.get('/:id', async(req, res) =>{
//     const employee= await Employee.findById(req.params.id);
//     if(!employee) return res.status(404).send('the employee with the given id was not found');
//     res.send(employee);
//  });

 router.get('/:name', async(req, res) =>{
    const employee= await Employee.findOne({name:req.params.name});
    if(!employee) return res.status(404).send('the Empolyee with the given name was not found');
    res.send(employee);
 });

router.post('/', async(req, res) => {
    const {error} =validateEmployee(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let employee= new Employee({
         name:req.body.name,
         department:req.body.department,
         project:req.body.project,
         salary:req.body.salary,
         e_mail:req.body.e_mail,
         password:req.body.password,
         position:req.body.position
        });
        employee= await employee.save();  
    res.send(employee)
});

router.put('/:name', async(req, res) =>{
     //validate?
    //if not validate, return 400 -bad request
    const {error} =validateEmployee(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const employee= await Employee.findOneAndUpdate({name:req.params.name},
        { name: req.body.name,
        department:req.body.department,
         project:req.body.project,
         salary:req.body.salary,
         e_mail:req.body.e_mail,
         password:req.body.password,
         position:req.body.position
        })

    //if not existing, return 404
    if(!employee) return res.status(404).send('the employee with the given id was not found');
    
    //return the updated employee.
    res.send(employee);
});

router.delete('/:name', async(req, res) =>{
    const employee= await Employee.findOneAndRemove({name:req.params.name});
    //not existing, return 404
    if(!employee) return res.status(404).send('the employee with the given name was not found');

    res.send(employee);
});

module.exports = router;
