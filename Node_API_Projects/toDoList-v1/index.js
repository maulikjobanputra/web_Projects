const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname+"/date.js");
const mongoose = require('mongoose');
const _ = require('lodash')

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('Public'));

mongoose.connect('mongodb+srv://MikSi1:experias@cluster0.2efh3m5.mongodb.net/todolistDB');

const itemsSchema = new mongoose.Schema({

    name : String

});

const Item = mongoose.model('Item', itemsSchema);

const item1 = new Item({
    name : "Welcome to your to do list"
});

const item2 = new Item({
    name : "Hit + to add a new item."
});

const item3 = new Item({
    name : "<-- Hit this to delete an item."
});

const defaultItems = [ item1, item2, item3 ];

const listSchema = new mongoose.Schema({

    name : String,
    items : [itemsSchema]
});

const List = mongoose.model('List', listSchema);



app.get('/', (req, res)=>{ 
    
    Item.find( {}, (err, docs) => {
        
        if (err){
            console.log(err);
        }else{

            if (docs.length === 0){
                
                Item.insertMany(defaultItems, (err) => {
                
                    if (err){
                        console.log(err);
                    };
                });

                res.redirect('/');
                
            }else{
                
                res.render('lists', {title: 'Today', newItems : docs});
            };
        };
    });    
});

app.get('/about',(req,res)=>{
    res.render("about")
});

app.get('/:customListName', (req , res) => {
    
    const customListName = _.capitalize(req.params.customListName);

    List.findOne({name : customListName}, (err , docs) =>{

        if(!docs){

            const list = new List({
                name : customListName,
                items : defaultItems
            });

            list.save(() => {
                
                res.redirect('/'+customListName)
            });

            
        }else{

            if(docs.items.length === 0){
                
                docs.updateOne({$push : {items : {$each : defaultItems}}},() =>{});

                res.redirect('/'+customListName);

            }else{
            
                res.render('lists', {title : docs.name , newItems : docs.items});
            };
        };    
    });
});


app.post('/', (req, res) => {

    const customListName = req.body.button;

    const itemName = req.body.newItems;

    const newItem = new Item({
    
        name : itemName
    });

    if (customListName == "Today"){

        newItem.save(() => {
            
            res.redirect('/');
        });


    }else{

        List.findOne({name : customListName},  (err , docs) => {

            docs.items.push(newItem);

            docs.save(() => {

                res.redirect('/'+customListName);
            });
        });
        
    };
});

app.post('/delete', (req, res) => {

    const deleteItemId = req.body.checkbox;

    const customListName = req.body.listName;

    if(customListName == "Today"){

        Item.findByIdAndDelete ( deleteItemId, () => {
            
            res.redirect("/");
        });

    }else{
        
        List.findOneAndUpdate( {name : customListName}, {$pull : {items : {_id : deleteItemId}}}, () => {

            res.redirect('/'+customListName)
        });
    };
});


let port = process.env.PORT;
if (port == null || port == "Server has started successfully") {
  port = 3000;
}
app.listen(port);
