

let ccode = '';
let scode = '';



const getCountries = () => {
    
    fetch("https://api.countrystatecity.in/v1/countries", {headers: {"X-CSCAPI-KEY" : "ZkFrazMwbkJuMnk2a2ZNUThXSmEzOENhTDhQTWcxVllKbHprY0Z6dA=="}})
    
    .then(response => response.json())
    
    .then(result => {
        
        let options = '<option selected>Select Country</option>'
        
        result.forEach(e => {
            options += "<option value = "+e.iso2+">"+e.name+"</option>"
        });
        
        document.querySelector("#country").innerHTML = options;
    })
    
    .catch(error => console.log('error', error));
};



const getState= () => {
    
    let options = '<option selected>Select State</option>'

    ccode = country.value;

    fetch(`https://api.countrystatecity.in/v1/countries/${ccode}/states`, {headers: {"X-CSCAPI-KEY" : "ZkFrazMwbkJuMnk2a2ZNUThXSmEzOENhTDhQTWcxVllKbHprY0Z6dA=="}})

    .then(response => response.json())

    .then(result => {

        result.forEach(e => {
            options += "<option value = "+e.iso2+">"+e.name+"</option>"
        });

        document.querySelector("#state").innerHTML = options;
    })

    .catch(error => console.log('error', error));
};




const getCity = () => {

    let options = '<option selected>Select City</option>'

    scode = state.value;

    fetch(`https://api.countrystatecity.in/v1/countries/${ccode}/states/${scode}/cities`, {headers: {"X-CSCAPI-KEY" : "ZkFrazMwbkJuMnk2a2ZNUThXSmEzOENhTDhQTWcxVllKbHprY0Z6dA=="}})

    .then(response => response.json())

    .then(result => {

        result.forEach(e => {
            options += "<option>"+e.name+"</option>"
        });

        document.querySelector("#city").innerHTML = options;
    })

    .catch(error => console.log('error', error));
}

const getWeather = () => {
    
    let cityName = city.value;

    locate.innerHTML = cityName;

    fetch(`/weather?location=${cityName}`)

    .then(response => response.json())

    .then(result => {
       
        heading.innerHTML = result.main.temp+'°C.';
        image.setAttribute('src',`http://openweathermap.org/img/wn/${result.weather[0].icon}@2x.png`);
        weather.innerHTML = result.weather[0].description.toUpperCase();
    })

    .catch(error => console.log('error', error));

}

let currentTime = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
time.innerHTML = currentTime;