require('dotenv').config();
const http = require('http');
const socketio = require('socket.io');
const express = require('express');
const Filter = require('bad-words');
const { addUser, removeUser, usersInRoom } = require("./utils/users")
const bodyParser = require('body-parser');
const app = express();

const server = http.createServer(app);
const io = socketio(server);

const { PORT } = process.env;
const { generateMessage, generateLocationMessage } = require('./utils/generateMessage')

app.use(express.static(__dirname + '/../public'));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/../templates/views')
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.render('index', {error:''});
});
const user = {};

app.post('/join', (req, res) => {

    user['username'] = req.body['username'];
    user['room'] = req.body['room'];
    const result = addUser(user);
    if(result.error){
        return res.render('index', {error:result.error})
    };

    res.render('chat');     
});


io.on('connection', (socket)=>{
    const {username , room} = user;
    
    socket.join(room);

    socket.emit('message', "Admin", generateMessage("Welcome!"));

    socket.broadcast.to(room).emit('message', username, generateMessage(`${username} has joined!`));
    io.to(room).emit('roomData', {room, users: usersInRoom(room)});

    socket.on('sendMessage', (message, cb) => {

        const filter = new Filter();
        if(filter.isProfane(message)){
            return cb('Profanity not allowed!')
        };

        io.to(room).emit('message', username, generateMessage(message));
        cb();
    });

    socket.on('disconnect', () => {
        
        removeUser(username)
        socket.broadcast.to(room).emit("message", username, generateMessage(`${username} just left!`));
        io.to(room).emit('roomData', {room, users: usersInRoom(room)});
    });

    socket.on('sendLocation', (latitude, longitude, cb) => {
        io.to(room).emit('locationMessage', username, generateLocationMessage(`https://google.com/maps?q=${latitude},${longitude}`));
        cb('Location shared!')
    });
});


server.listen(PORT, () => {
    console.log('Server running at port 3000!');
});