require('dotenv').config();
const jwt = require('jsonwebtoken');

const {JWT_SECRET} = process.env;

const authenticate = (req, res, next) => {

    const token = req.header('auth_token');

    if(!token){
        
      res.status(400).json({msg: 'Authorization Failed'})
    };

    try {

        const decoded = jwt.verify(token, JWT_SECRET);
        req.email = decoded.email;
        next();

      } catch(err) {

        res.status(400).json({msg :'Authorization Failed'})
      };
}

module.exports = authenticate;