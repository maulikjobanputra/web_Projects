const generateMessage = (text) => {
    return {
        text,
        timeStamp : Date.now()
    };
};
const generateLocationMessage = (url) => {
    return {
        url,
        timeStamp : Date.now()
    };
};

module.exports = {generateMessage, generateLocationMessage};