// Initialize API
const key = "your key goes here";


const getWeather = async (id) => {
    const base = 'https://dataservice.accuweather.com/currentconditions/v1/';
    const query = `${id}?apikey=${key}`;

    const response = await fetch(base + query);
    const data = await response.json();
    return data;
}

// Use the city API to find cities
// Async allows await to be used
const getCity = async (city) => {
    const base = 'https://dataservice.accuweather.com/locations/v1/cities/search';
    const query = `?apikey=${key}&q=${city}`;
    const response = await fetch(base + query);
    const data = await response.json();
    return data[0];
}

getCity('Lafayette')
    .then((data) => {
        console.log(data);
        return getWeather(data.Key);
    })
    .then((result) => console.log(result[0]))
    .catch((err) => console.log(err));