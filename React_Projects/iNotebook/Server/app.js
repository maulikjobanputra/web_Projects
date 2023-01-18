const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://localhost:27017/iNotebookDB');

app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));


app.listen(9000, ()=>{
    console.log('Server running at port 9000!');
})