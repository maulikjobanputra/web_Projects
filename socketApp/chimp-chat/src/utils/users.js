const users = [];

const addUser = (obj) => {

    username = obj.username.trim().toLowerCase();
    room = obj.room.trim().toLowerCase();

    const userExist = users.find(user => user.username === username && user.room === room);

    if(userExist){
        return { error : "Username in use!"};
    };
    username = username.slice(0,1).toUpperCase().concat(username.slice(1))
    users.push({username, room});

    return obj;
};

const removeUser = (username) => {

    username = username.trim().toLowerCase();
    username = username.slice(0,1).toUpperCase().concat(username.slice(1));
    const index = users.findIndex(user => user.username === username);

    if(index !== -1){
        const removedUser = users.splice(index,1);
        return removedUser[0];
    };
};

const usersInRoom = (room) => {

    room = room.trim().toLowerCase();
    return users.filter(user => user.room === room);
};

module.exports = {addUser, removeUser, usersInRoom};
