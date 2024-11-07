function refreshWeather(response) {
    let tempElement = document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
    tempElement.innerHTML = Math.round(temperature);

    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windspeedElement = document.querySelector("#speed");
    let timeElement = document.querySelector("#time");

    let date = new Date(response.data.time * 1000); 
    let cityElement = document.querySelector(".location");
    cityElement.innerHTML = response.data.city;

    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    windspeedElement.innerHTML = `${response.data.wind.speed} km/h`;
    timeElement.innerHTML = formatDate(date);

    let bodyElement = document.querySelector("body");

    if (temperature < 15) { 
        bodyElement.classList.remove("sunny");
        bodyElement.classList.add("rainy");
    } else { 
        bodyElement.classList.remove("rainy");
        bodyElement.classList.add("sunny");
    }
}

function formatDate(date) {
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[date.getDay()];

    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    return `${day} ${hours}:${minutes},`;
}

function searchCity(location) {
    const apiKey = "a1f90bc0bf23da8c35fe325tob5f8845";
    const apiUrl = `https://api.shecodes.io/weather/v1/current?query=${location}&key=${apiKey}&units=metric`;

    axios.get(apiUrl)
        .then(response => {
            console.log(response); // Log the response to check its structure
            refreshWeather(response);
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
        });
}

function searchHandle(event) {
    event.preventDefault();
    let inputElement = document.querySelector(".search");
    searchCity(inputElement.value);
}

let outputElement = document.querySelector("#search-engine");
outputElement.addEventListener("submit", searchHandle);
