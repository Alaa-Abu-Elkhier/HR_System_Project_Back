const jwt = require('jsonwebtoken')

function auth(req,res,next){

    const token=req.header('x-auth-token');
    if (!token) return res.status(401).send('Access denied')
   try{
    const decoded = jwt.verify(token,'privateKey');
    req.employee=decoded;
    next();    
}
    catch(exp){
      res.status(400).send('invalid token');
    }
}

module.exports = auth;