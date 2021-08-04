/* TODO:
- titlecase description
- amend select country to optional country
- make celcius vs farenheit an optional
- split into modules 
- add bootstrap for styling
*/
const key = "891ddda0b4720fad959806ec96f4a8dd";
const container = document.querySelector("#container");
let weatherLocation = "";
let countryLocation = "";
let unitSelection = "";
let unitCharacter = "";
let errorMsg = document.querySelector("#error");

const getWeather = async () => {
  try {
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${weatherLocation},${countryLocation}&units=${unitSelection}&APPID=${key}`
    );
    const weatherData = await response.json();
    addToPage(weatherData);
  } catch (error) {
    errorMsg.textContent = "Error, could not find country.";
  }
};

const addToPage = (data) => {
  errorMsg.textContent = "";
  const location = document.querySelector("#location");
  const temp = document.querySelector("#temp");
  const tempMax = document.querySelector("#tempMax");
  const tempMin = document.querySelector("#tempMin");
  const description = document.querySelector("#description");
  let weatherIcon = document.querySelector("#weatherIcon");
  weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  location.textContent = `Location: ${data.name}, ${data.sys.country}`;
  temp.textContent =
    "Current temperature: " + Math.round(data.main.temp) + unitCharacter;
  description.textContent = `${data.weather[0].description}`;
  tempMax.textContent =
    "Max temperature: " + Math.round(data.main.temp_max) + unitCharacter;
  tempMin.textContent =
    "Min temperature: " + Math.round(data.main.temp_min) + unitCharacter;
};

search.addEventListener("click", () => {
  const searchResults = document.querySelector("#searchBox");
  let unit = document.querySelector("#unitSelect");
  weatherLocation = searchResults.value;
  countryLocation = countrySelect.value;
  unitSelection = unit.value;
  if (unitSelection === "metric") {
    unitCharacter = "°C";
  } else if (unitSelection === "imperial") {
    unitCharacter = "°F";
  }
  getWeather();
});

(async () => {
  const response = await fetch(`https://restcountries.eu/rest/v2/all`);
  const countries = await response.json();
  const selections = document.querySelector("#countrySelect");
  for (const country of countries) {
    let countryOpts = document.createElement("option");
    countryOpts.value = country.alpha2Code;
    countryOpts.text = country.name;
    selections.appendChild(countryOpts);
  }
})();
