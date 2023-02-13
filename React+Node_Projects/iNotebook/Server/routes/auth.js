require('dotenv').config();
const express = require('express');
const router = express.Router();
const User = require('../Models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authenticate = require('../middleware/authenticate');

const {JWT_SECRET} = process.env;

router.post('/register',

    body('name')
    .not()
    .isEmpty()
    .withMessage("Enter the name"),

    body('email')
    .isEmail()
    .withMessage('Invalid email')
    .not()
    .isEmpty()
    .withMessage("Enter the email")
    .custom(async (value) => {
        const docs = await User.find({email: value});
        if (docs.length!==0){
            throw new Error('Email already taken!')
        }
    }),

    body('password')
    .not()
    .isEmpty()
    .withMessage("Enter the password")
    .isStrongPassword()
    .withMessage("Enter password with minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1"),

    (req, res) => {

        let success = false;

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            success = 'error';
            return res.status(400).json({...errors.mapped(), success})
        }
        
        const {name, email, password} = req.body;
        
        const user = new User({
            name: name,
            email: email,
            password : bcrypt.hashSync(password, bcrypt.genSaltSync(10))
        });

        const token = jwt.sign({ email: user.email }, JWT_SECRET);

        user.save((err)=>{
            if (!err) {
                success = true;
                res.status(200).json({success, auth_token : token});
            }else{
                res.status(500).json({success, msg: "Internal Server Error!"});
            }
        })
    }
);

router.post('/login',

    body('email')
    .isEmail()
    .withMessage('Invalid email')
    .not()
    .isEmpty()
    .withMessage("Enter the email"),

    body('password')
    .not()
    .isEmpty()
    .withMessage("Enter the password")
    .isStrongPassword()
    .withMessage("Enter password with minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1"),

    (req, res) => {

        let success = false;

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            success = 'error';
            return res.status(400).json({...errors.mapped(), success})
        };

        const { email, password } = req.body;

        User.findOne({email:email}, (err, user)=>{

            if(user){

                const result = bcrypt.compareSync(password, user.password);

                if(!result){

                    res.status(400).json({success, msg : 'Incorrect credentials'})

                }else{
                    
                    const token = jwt.sign({ email: user.email }, JWT_SECRET);
                    success = true;
                    res.status(200).json({success, auth_token : token});
                }
            }else{
                res.status(400).json({success, msg : 'Incorrect credentials'})
            }
        });
    }
)



module.exports = router;