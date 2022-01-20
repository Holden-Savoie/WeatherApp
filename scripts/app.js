const ourForm = document.querySelector('form');
const cityInput = document.getElementById('city-field');
const detailsCont = document.querySelector('.details-cont');
const colorCard = document.querySelector('.details-visual');
const weatherImg = document.querySelector('.details-visual>img');
const textCard = document.querySelector('.details-text');

const getData = async (city) => {
    const cityData = await getCity(city);
    const weatherData = await getWeather(cityData.Key);
    console.log('weatherData', weatherData);

    return {
        cityName: cityData.LocalizedName,
        conditions: weatherData[0].WeatherText,
        temp: weatherData[0].Temperature.Imperial.Value,
        imageIndex: weatherData[0].WeatherIcon,
        isDayTime: weatherData[0].IsDayTime,
    };
};

const updateUI = (data) => {
    textCard.innerHTML = `       
            <h5>${data.cityName}</h5>
            <div>${data.conditions}</div>
            <div class="temp-text">Temp:<span>${data.temp}&deg;F</span></div>
        `;

    console.log(data.isDayTime);
    if (data.isDayTime) {
        colorCard.style.backgroundColor = 'skyblue';
    } else {
        colorCard.style.backgroundColor = '#191970';
    }

    weatherImg.setAttribute('src', `./weather-icons/${data.imageIndex}.png`);
}


ourForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const city = cityInput.value.trim();
    e.target.reset();
    getData(city)
        .then((data) => updateUI(data))
        .catch((err) => console.log(err));
})

// getData('Lafayette')
//     .then((data) => console.log('data', data))
//     .catch((err) => console.log(err));