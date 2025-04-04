// API key aur weather API URL define kiye gaye hain
const apikey = "209ac46616b5f90d97f51b050ac95120";
const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

// Input field, search button, current location button aur weather icon select kiye gaye hain
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const currentLocationBtn = document.getElementById("current-location-btn");
const weatherIcon = document.querySelector(".weather-icon");

// User ke input se city ka naam leke weather fetch karne wala function
async function checkWeather(city) {
    const response = await fetch(apiurl + city + `&appid=${apikey}`);

    // Agar city ka naam galat diya gaya ho toh error dikhayenge
    if (response.status == 404) {
        document.querySelector(".error").style.display = "block"; // error message dikhana
        document.querySelector(".weather").style.display = "none"; // weather info hata dena
    } else {
        // Sahi response milne par usko JSON mein convert karenge
        const data = await response.json();
        displayWeather(data); // Weather details show karna
        setBackground(data.weather[0].main); // Weather ke type ke according background set karna
    }
}

// Weather data ko HTML elements mein display karne ka function
function displayWeather(data) {
    document.querySelector(".city").innerHTML = data.name; // City ka naam dikhana
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C"; // Temperature dikhana
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%"; // Humidity dikhana
    document.querySelector(".Wind").innerHTML = data.wind.speed + "km/hr"; // Wind speed dikhana

    const condition = data.weather[0].main; // Weather ka type (e.g., Clear, Clouds)

    // Weather ke hisaab se suitable icon lagana
    if (condition === "Clouds") weatherIcon.src = "images/clouds.png";
    else if (condition === "Clear") weatherIcon.src = "images/clear.png";
    else if (condition === "Rain") weatherIcon.src = "images/rain.png";
    else if (condition === "Drizzle") weatherIcon.src = "images/drizzle.png";
    else if (condition === "Mist") weatherIcon.src = "images/mist.png";

    // Weather info dikhana aur error hata dena
    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
}

// Weather condition ke hisaab se background image set karne ka function
function setBackground(condition) {
    const body = document.body;

    // Different weather conditions ke liye background image set karna
    if (condition === "Clear") {
        body.style.backgroundImage = "url('images/clearbg.jpeg')";
    } else if (condition === "Clouds") {
        body.style.backgroundImage = "url('images/cloudyrbg.jpeg')";
    } else if (condition === "Rain") {
        body.style.backgroundImage = "url('images/rainbg.jpg')";
    } else if (condition === "Drizzle") {
        body.style.backgroundImage = "url('images/drizzlebg.jpeg')";
    } else if (condition === "Thunderstorm") {
        body.style.backgroundImage = "url('images/thunderstormbg.jpeg')";
    } else if (condition === "Snow") {
        body.style.backgroundImage = "url('images/snowbg.jpeg')";
    } else if (condition === "Mist" || condition === "Haze" || condition === "Fog") {
        body.style.backgroundImage = "url('images/mistbg.jpeg')";
    } else {
        // Default background agar koi condition match na kare
        body.style.backgroundImage = "none";
        body.style.backgroundColor = "#222";
    }

    // Background image ki styling
    body.style.backgroundSize = "cover";
    body.style.backgroundRepeat = "no-repeat";
    body.style.backgroundPosition = "center";
}

// Latitude aur longitude ke through current location ka weather fetch karne ka function
async function getWeatherByCoords(lat, lon) {
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}&units=metric`
    );
    const data = await response.json();
    displayWeather(data); // Weather info dikhana
    setBackground(data.weather[0].main); // Background change karna
}

// "Current Location" button click hone par location detect karke weather fetch karna
currentLocationBtn.addEventListener("click", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                getWeatherByCoords(position.coords.latitude, position.coords.longitude);
            },
            () => {
                alert("Unable to retrieve your location."); // Agar location access fail ho jaaye
            }
        );
    } else {
        alert("Geolocation is not supported by your browser."); // Agar browser geolocation support nahi karta
    }
});

// Jab user search button pe click kare, tab uske input se weather data fetch karna
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});
searchBox.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        checkWeather(searchBox.value);
    }
});

