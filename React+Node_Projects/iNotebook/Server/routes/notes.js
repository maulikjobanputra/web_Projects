const express = require('express');
const router = express.Router();
const Note = require('../Models/Notes');
const authenticate = require('../middleware/authenticate');
const { body, validationResult } = require('express-validator');


router.post('/addnote', authenticate, [
    body('title')
    .isLength({min : 3})
    .withMessage("Enter atleast 3 letters!"),

    body('description')
    .isLength({min : 5})
    .withMessage("Enter atleast 5 letters!")

], (req, res) => {

    const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.send(errors.mapped())
        }
    const {title, description} = req.body;

    const note = new Note({
        title,
        description,
        user : req.email
    });

    note.save((err) => {
        if(!err){
            res.send({});
        };
    });
});


router.get('/fetch', authenticate, (req,res)=>{

    Note.find({user : req.email},(err, notes)=>{

    
        if(!err){
            res.send(notes)
        }else{
            res.send(err)
        }
        
    })
});



router.patch('/updatenote/:id', authenticate, [
    body('title')
    .isLength({min : 3})
    .withMessage("Enter atleast 3 letters!"),

    body('description')
    .isLength({min : 5})
    .withMessage("Enter atleast 5 letters!")

], (req, res)=>{

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.send(errors.mapped())
    }

    Note.findOne({_id: req.params.id},(err, note)=>{
        
        if(err){
            res.send(err)
        } else if(!note){
            res.send("No note found!")
        }else{
            
            if(note.user !== req.email){
                return res.send("Access Denied")
            };

            note.updateOne({$set : req.body}, (err)=>{
                if(!err){
                    res.status(200).send({})
                }else{
                    res.send(err)
                };
            });
            
        };
    });
});


router.delete('/deletenote/:id', authenticate, (req,res)=>{

    Note.findOne({_id: req.params.id},(err, note)=>{
        
        if(err){
            res.send(err)
        } else if(!note){
            res.send({msg : "No note found!"})
        }else{
            
            if(note.user !== req.email){
                return res.send({msg: "Access Denied!"})
            };

            note.delete(err =>{
                if(!err){
                    res.send({msg : "Successfully deleted!"})
                }else{
                    res.send(err)
                };
            });
        };
    });
});

module.exports = router;