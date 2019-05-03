const Joi = require('joi');
const express=require('express');

const app=express();
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.use(express.json());
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/HR-System',{ useNewUrlParser: true })
.then(() => console.log('connected to db successfully'))
.catch((err) => console.log(err));
const Empolyee=require('./models/Epolyee');
console.log("test");

app.post('/Hr-System',async(req,res)=>{
    
    
        const result= await Empolyee.create(req.body);

        res.send(result);
        console.log(result);
   
    
    
    });
    app.get('/Hr-System',async(req,res)=>{


      const result= await Empolyee.find(Empolyee);

      res.send(result);
      console.log(result);
      });
      app.get('Hr-System/:name', async(req,res) => {
        const result = await  Empolyee.find({name: req.params.ID});
        if(result.length===0){
        res.status(404).send('This Employee is not exist');
        }
        else{
        res.send(result);
        console.log(result);
        }
        
    })
    console.log("test");


app.listen(3000);







   