const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mailchimp = require("@mailchimp/mailchimp_marketing");

mailchimp.setConfig({
  apiKey: "7c4bb42fd2701a4ec19ceca4793c8dc8-us17",
  server: "us17",
});

app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended:true}));

app.get('/', (req,res)=>{
    res.sendFile(__dirname+"/signup.html");
});

app.post('/', (req,res)=>{
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;
    
    const listId = "e86533f450";
    

    const run = async ()=>{
        try{

            const response = await mailchimp.lists.addListMember(listId, {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            });
            
            res.sendFile(__dirname+"/success.html");

        } catch(e){

            res.sendFile(__dirname+"/failure.html")
        }
        
    };

run();

});


app.post('/success', (req,res)=>{
    res.redirect('/');
});

app.post('/failure', (req,res)=>{
    res.redirect('/');
});

app.listen(process.env.PORT || 80);

