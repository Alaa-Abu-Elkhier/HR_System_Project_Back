const mongoose= require('mongoose');
const employees = require('./routes/employees');  //exported file
const express= require ('express');
const app= express();
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");

    next();
  });

mongoose.connect('mongodb://localhost/project', { useNewUrlParser: true })
        .then (() => console.log('connected to mongoDB '))
        .catch(err => console.error ('could not connect to mongoDB', err));

        mongoose.set('useNewUrlParser', true);
        mongoose.set('useFindAndModify', false);
        mongoose.set('useCreateIndex', true); mongoose.set('useFindAndModify', false);

app.use(express.json());
app.use('/api/employees', employees);

const port=process.env.port||8000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
