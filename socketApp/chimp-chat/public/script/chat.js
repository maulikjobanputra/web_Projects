const socket = io();
const $messageForm = document.querySelector('#message-form');
const $messageFormInput = document.querySelector('#message-input');
const $messageFormButton = document.querySelector('#message-button');
const $locationButton = document.querySelector('#send-location');
const $messages = document.querySelector('#messages');
const $sidebar = document.querySelector('#sidebar');
const messageTemplate = document.querySelector('#message-template').innerHTML;
const locationTemplate = document.querySelector('#location-message-template').innerHTML;
const sidebarTemplate = document.querySelector('#sidebar-template').innerHTML;

const autoscroll = () => {

    const $newMessage = $messages.lastElementChild;
    const newMessageMargin = parseInt(getComputedStyle($newMessage).marginBottom);
    const newMessageHeight = $newMessage.offsetHeight + newMessageMargin;

    const visibleHeight = $messages.offsetHeight;

    const containerHeight = $messages.scrollHeight;
    
    if($messages.scrollHeight - visibleHeight - $messages.scrollTop <= newMessageHeight){
        $messages.scrollTop = $messages.scrollHeight
    }
};

socket.on('message',  (username, msg) => {
    
    const html = Mustache.render(messageTemplate, {username, msg:msg.text, timeStamp : moment(msg.timeStamp).format("hh:mm A")});
    $messages.insertAdjacentHTML("beforeend", html);
    autoscroll();
});

socket.on('locationMessage', (username, url) => {

    const html = Mustache.render(locationTemplate, {username, url :url.url, timeStamp : moment(url.timeStamp).format("hh:mm A")});
    $messages.insertAdjacentHTML("beforeend", html);
    autoscroll();

});

socket.on('roomData', ({room, users})=> {

    const html = Mustache.render(sidebarTemplate, {room ,users});
    $sidebar.innerHTML = html;
})

$messageForm.addEventListener('submit', (e => {
   
    e.preventDefault();

    $messageFormButton.setAttribute('disabled','disabled');
    
    const message = $messageFormInput.value;
    
    socket.emit('sendMessage', message, (error => {

        $messageFormButton.removeAttribute('disabled');
        $messageFormInput.value = "";
        $messageFormInput.focus();

        if(error){
            return console.log(error);
        };
        console.log('Message delivered!');
    }));
}));

$locationButton.addEventListener('click', () => {

    if(!navigator.geolocation){
        return alert('Geolocation is not supported in your browser!')
    };

    $locationButton.setAttribute('disabled',"disabled");

    navigator.geolocation.getCurrentPosition(position => {

        const { latitude, longitude } = position.coords;

        socket.emit('sendLocation', latitude, longitude, (msg => {
            $locationButton.removeAttribute('disabled');
            console.log(msg);
        }))
    });
});