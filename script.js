const apikey = "209ac46616b5f90d97f51b050ac95120";
const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const currentLocationBtn = document.getElementById("current-location-btn");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    const response = await fetch(apiurl + city + `&appid=${apikey}`);
    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        const data = await response.json();
        displayWeather(data);
        setBackground(data.weather[0].main);
    }
}

function displayWeather(data) {
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".Wind").innerHTML = data.wind.speed + "km/hr";

    const condition = data.weather[0].main;
    if (condition === "Clouds") weatherIcon.src = "images/clouds.png";
    else if (condition === "Clear") weatherIcon.src = "images/clear.png";
    else if (condition === "Rain") weatherIcon.src = "images/rain.png";
    else if (condition === "Drizzle") weatherIcon.src = "images/drizzle.png";
    else if (condition === "Mist") weatherIcon.src = "images/mist.png";

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
}

function setBackground(condition) {
    const body = document.body;

    if (condition === "Clear") {
        body.style.backgroundImage = "linear-gradient(to right, #56ccf2, #2f80ed)";
    } else if (condition === "Clouds") {
        body.style.backgroundImage = "linear-gradient(to right, #bdc3c7, #2c3e50)";
    } else if (condition === "Rain") {
        body.style.backgroundImage = "linear-gradient(to right, #373b44, #4286f4)";
    } else if (condition === "Drizzle") {
        body.style.backgroundImage = "linear-gradient(to right, #89f7fe, #66a6ff)";
    } else if (condition === "Thunderstorm") {
        body.style.backgroundImage = "linear-gradient(to right, #141e30, #243b55)";
    } else if (condition === "Snow") {
        body.style.backgroundImage = "linear-gradient(to right, #e6dada, #274046)";
    } else if (
        condition === "Mist" || 
        condition === "Haze" || 
        condition === "Fog"
    ) {
        body.style.backgroundImage = "linear-gradient(to right, #3e5151, #decba4)";
    } else {
        body.style.backgroundImage = "none";
        body.style.backgroundColor = "#222";
    }

    body.style.backgroundSize = "cover";
    body.style.backgroundRepeat = "no-repeat";
}

async function getWeatherByCoords(lat, lon) {
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}&units=metric`
    );
    const data = await response.json();
    displayWeather(data);
    setBackground(data.weather[0].main);
}

currentLocationBtn.addEventListener("click", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                getWeatherByCoords(position.coords.latitude, position.coords.longitude);
            },
            () => {
                alert("Unable to retrieve your location.");
            }
        );
    } else {
        alert("Geolocation is not supported by your browser.");
    }
});

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});
