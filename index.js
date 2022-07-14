function GetCurrentDate() {
  let dateGen = new Date();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dateGen.getDay()];
  let hour = dateGen.getHours();
  if (hour <= 9) {
    hour = "0" + hour;
  }
  let min = dateGen.getMinutes();
  if (min <= 9) {
    min = "0" + min;
  }
  return `${day}, ${hour}:${min}`;
}

function SetCurrentDate() {
  document.querySelector("li#date").innerHTML = GetCurrentDate();
}

function searchCity(city) {
  var apiKey = "03cc9b8479bb5a2db9ec53fe58f6ab8a";
  var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(GetTemp);
}

function handleSubmit(event) {
  event.preventDefault();
  var city = document.querySelector("#city-input").value;
  searchCity(city);
}

function GetTemp(response) {
  let city = response.data.name;
  let showCity = document.querySelector("#city");
  showCity.innerHTML = city;

  let temperature = Math.round(response.data.main.temp);
  let showTemp = document.querySelector("#temperature");
  showTemp.innerHTML = `${temperature}`;

  let humidity = Math.round(response.data.main.humidity);
  let showHumidity = document.querySelector("#humidity");
  showHumidity.innerHTML = `${humidity}`;

  let wind = Math.round(response.data.wind.speed);
  let showWind = document.querySelector("#wind");
  showWind.innerHTML = `${wind}`;

  let description = response.data.weather[0].main;
  let showDescription = document.querySelector("#description");
  showDescription.innerHTML = `${description}`;

  SetCurrentDate();
  document.querySelector("h1#city").innerHTML = city;
}

function searchLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  var apiKey = "03cc9b8479bb5a2db9ec53fe58f6ab8a";
  let apiUrlCoord = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  axios.get(apiUrlCoord).then(GetCurrentCity);
}

function GetCurrentCity(response) {
  let city = response.data.name;
  searchCity(city);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

var location = document.querySelector("#current-location-button");
location.addEventListener("click", getCurrentLocation);

var formS = document.querySelector("#search-form");
formS.addEventListener("submit", handleSubmit);
