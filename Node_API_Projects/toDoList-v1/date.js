
const getDate = ()=>{
    
    let options = {
        weekday: "long",
        month: "long",
        day: "numeric"
    };
        
    return new Date().toLocaleDateString('en-us', options);
};  

    
module.exports = {getDate};