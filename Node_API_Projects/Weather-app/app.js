const express = require('express');
const app = express();
const axios = require('axios');

app.set('view engine','hbs');
app.use(express.static('public'));

app.get('/', (req, res) => {

    res.render('index');
});

app.get('/weather', (req, res)=>{

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${req.query.location}&appid=6a21010390fda07e945ade4baf9f784c&units=metric`)

    .then(response => response.json())

    .then(result => {
        res.send(result)
    });
})

app.listen(3000, () => {
    console.log('Server running at port 3000!');
});